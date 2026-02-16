/*
 * @Author: czy0729
 * @Date: 2024-11-11 10:06:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 09:27:25
 */
import { userStore } from '@stores'
import { asc, confirm, desc, getTimestamp, HTMLDecode, info, queue, sleep } from '@utils'
import { request } from '@utils/fetch.v0'
import { API_COLLECTIONS } from '@utils/fetch.v0/ds'
import { get, gets, update } from '@utils/kv'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { ResponseV0UserCollections, SubjectId } from '@types'
import { MAX_COLLECT_PAGE, TIME_PATTERN } from '../ds'
import { CollectionsItem, LikeItem, ListItem, Relates } from '../types'
import { calc, dayDiff, getTyperankRelates, matchYear, mergeArrays } from '../utils'
import Computed from './computed'
import { COLLECTION_STATUS, EXCLUDE_STATE } from './ds'

export default class Fetch extends Computed {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 获取用户在看和看过的收藏 */
  fetchCollections = async () => {
    if (!this.userId) return false

    if (this.state.fetching) return false

    const data = await this.fetchCollectionsQueue()
    if (!data.length) {
      setTimeout(() => {
        confirm(
          '没有获取到任何该类型的收藏数据，可能是您的授权信息过期了，也有可能是服务崩了，尝试重新自动授权后再次获取？',
          async () => {
            await userStore.reOauth()
            setTimeout(() => {
              this.getList(true)
            }, 0)
          }
        )
      }, 0)
      return false
    }

    // 预先计算自己的所有收藏, 标签的推荐值
    const tags: Record<string, number> = {}
    data.forEach(item => {
      if (Array.isArray(item.tags)) {
        // 忽略时间标签
        item.tags = item.tags.filter(item => !TIME_PATTERN.test(item))
        item.tags.forEach((tag: string) => {
          if (tag in tags) {
            tags[tag] += 1
          } else {
            tags[tag] = 1
          }
        })
      }
    })

    return data
      .sort((a, b) => asc(a.updated_at, b.updated_at))
      .map(item => {
        let rec = 0
        if (Array.isArray(item.tags)) {
          item.tags.forEach((tag: string) => {
            rec += tags[tag] || 0
          })
        }

        return {
          id: item.subject_id,
          name: HTMLDecode(item.subject.name_cn || item.subject.name),
          image: item.subject.images?.large?.split('/l/')?.[1]?.split('.jpg')?.[0] || '',
          rank: item.subject.rank || 0,
          score: item.subject.score || 0,
          rate: item.rate || 0,
          type: item.type,
          ep: item.ep_status || 0,
          comment: item.comment?.length || 0,
          private: item.private || false,
          diff: dayDiff(item.updated_at),
          tags: item.subject.tags.map(item => item.name),
          rec
        } as CollectionsItem
      })
  }

  /** 队列请求用户各收藏状态的收藏列表 */
  fetchCollectionsQueue = async () => {
    this.setState({
      fetching: true,
      message: '获取用户收藏',
      current: 1,
      total: MAX_COLLECT_PAGE
    })

    const subjectTypeValue = MODEL_SUBJECT_TYPE.getValue(this.state.type)
    const list: ResponseV0UserCollections['data'][] = []
    try {
      for (const item of COLLECTION_STATUS) {
        for (let i = 1; i <= item.page; i += 1) {
          const response = await request<ResponseV0UserCollections>(
            API_COLLECTIONS(this.userId, subjectTypeValue, i, 100, item.value),
            undefined,
            {
              timeout: 8000,
              onError: () => {}
            }
          )
          this.setState({
            current: this.state.current + 1
          })

          if (Array.isArray(response?.data)) list.push(...response.data)
          if ((response?.offset || 0) + (response?.limit || 100) >= (response?.total || 100)) break
        }
      }
    } catch (error) {
      info('部分请求发生错误, 请重试')
    }

    this.setState({
      ...EXCLUDE_STATE
    })
    return list
  }

  /** 获取每个条目的猜你喜欢 */
  fetchLike = async (collections: CollectionsItem[]) => {
    const likes: Record<SubjectId, LikeItem[]> = {}

    /** 存放没有快照数据的条目 */
    const nulls: Record<SubjectId, true> = {}

    // 先从快照批量获取
    await this.fetchSnapshotLikes(collections.map(item => item.id))
    const { snapshotLikes } = this.state
    Object.entries(snapshotLikes).forEach(([key, item]) => {
      const subjectId = key.replace('like_', '')
      if (!item) {
        nulls[subjectId] = true
      } else {
        likes[subjectId] = item.list || []
      }
    })

    // 对没有记录的在快照条目中进行逐个获取
    const fetchs = Object.keys(nulls).map(subjectId => async () => {
      const data = await get(`subject_${subjectId}`)
      const has = Array.isArray(data?.like) && data.like.length
      likes[subjectId] = has
        ? data.like.map((subject: LikeItem) => ({
            id: Number(subject.id),
            name: HTMLDecode(subject.name),
            image: subject.image.replace('//lain.bgm.tv/pic/cover/m/', '').replace('.jpg', '')
          }))
        : []

      await update(`like_${subjectId}`, {
        list: likes[subjectId]
      })
      await sleep(16)

      this.setState({
        current: this.state.current + 1
      })
    })
    this.setState({
      fetching: true,
      message: '获取条目信息',
      total: fetchs.length
    })
    await queue(fetchs)

    // 接入分类排名数据
    const [typerankRelates, typerankSubjectIds] = await getTyperankRelates(
      collections.filter(item => !likes[item.id]?.length),
      this.state.type
    )
    await this.fetchSnapshotSubjects(typerankSubjectIds)

    // 计算出显示的列表
    const relates: Relates = {}
    const subjects: Record<SubjectId, ListItem> = {}
    const { snapshotSubjects } = this.state
    collections.forEach(item => {
      const like = likes[item.id] || []
      try {
        // 若没有猜你喜欢官方数据, 从分类排名构造一个同样结构的数据
        if (!like?.length) {
          const typerankRelate = typerankRelates[item.id]
          if (typerankRelate?.length) {
            typerankRelate.forEach(subjectId => {
              // 避免条目索引到自身
              if (subjectId !== item.id) {
                const subject = snapshotSubjects[`subject_${subjectId}`]
                if (subject) {
                  like.push({
                    id: subjectId,
                    name: subject.name_cn,
                    image: subject.image
                  })
                }
              }
            })
          }
        }
      } catch (error) {}

      if (like?.length) {
        like.forEach(subject => {
          if (subjects[subject.id]) {
            subjects[subject.id].relates.push(item.id)

            const { reasons, rate } = calc(item, subjects[subject.id].relates.length)
            subjects[subject.id].rate += rate
            subjects[subject.id].reasons = mergeArrays(subjects[subject.id].reasons, reasons)
          } else {
            relates[item.id] = {
              ...item
            }

            const { reasons, rate } = calc(item)
            subjects[subject.id] = {
              id: subject.id,
              name: subject.name,
              image: subject.image,
              relates: [item.id],
              rate,
              reasons
            }
          }
        })
      }
    })

    this.setState({
      relates,
      ...EXCLUDE_STATE
    })
    return subjects
  }

  /** 条目猜你喜欢快照 */
  fetchSnapshotLikes = async (subjectIds: SubjectId[]) => {
    const keys = subjectIds
      .map(subjectId => `like_${subjectId}`)
      .filter(key => !(key in this.state.snapshotLikes))
    if (!keys.length) return

    const snapshotLikes = await gets(keys)
    this.setState({
      snapshotLikes
    })
    this.save()
  }

  /** 条目基本信息快照 */
  fetchSnapshotSubjects = async (subjectIds: readonly SubjectId[]) => {
    const keys = subjectIds
      .map(subjectId => `subject_${subjectId}`)
      .filter(key => !(key in this.state.snapshotSubjects))
    if (!keys.length) return

    const snapshotSubjects = await gets(keys, ['name_cn', 'image'])
    this.setState({
      snapshotSubjects
    })
    this.save()
  }

  /** 生成列表数据 */
  getList = async (refresh: boolean = false) => {
    try {
      const { type } = this.state
      if (!refresh && this.state.list[type].length) return

      const collections = await this.fetchCollections()
      if (!collections) return false

      const subjects = await this.fetchLike(collections)
      this.setState({
        list: {
          [type]: Object.entries(subjects)
            .filter(([, item]) => !!item)
            .map(([key, item]) => ({
              ...item,
              id: Number(key)
            }))
            .sort((a, b) => desc(a?.rate || -100, b?.rate || -100))
            .filter((_item, index) => index < 400)
        },
        collectedSubjectIds: {
          [type]: collections.map(item => item.id)
        }
      })
      this.save()
    } catch (error) {
      info('请求发生错误，请重试')
    }
  }

  /** 获取推荐条目的基本信息 */
  fetchSubjects = async (subjectIds: SubjectId[]) => {
    const { subjects } = this.state
    const fetchIds = []
    subjectIds.forEach(subjectId => {
      if (!(subjectId in subjects)) [fetchIds.push(`subject_${subjectId}`)]
    })
    if (!fetchIds.length) return

    const datas = await gets(fetchIds, ['type', 'rank', 'rating'])
    const values = {
      ...subjects
    }
    Object.entries(datas).forEach(([key, item]) => {
      const id = key.replace('subject_', '')
      if (!item) {
        values[id] = {
          _loaded: getTimestamp()
        }
      } else {
        values[id] = {
          type: item.type,
          rank: item.rank || 0,
          score: item?.rating?.score || 0,
          total: item?.rating?.total || 0,
          year: matchYear(item?.info),
          _loaded: getTimestamp()
        }
      }
    })
    this.setState({
      subjects: values
    })
    this.save()
  }
}
