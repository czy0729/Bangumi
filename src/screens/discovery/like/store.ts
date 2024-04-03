/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:41:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 08:35:39
 */
import { computed, observable } from 'mobx'
import { collectionStore, uiStore, userStore } from '@stores'
import { asc, confirm, desc, getTimestamp, HTMLDecode, info, queue, sleep } from '@utils'
import { t } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { get, gets, update } from '@utils/kv'
import store from '@utils/store'
import { MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import i18n from '@constants/i18n'
import { CollectionStatusValue, SubjectId, SubjectType, SubjectTypeValue } from '@types'
import { calc, dayDiff, matchYear, mergeArrays } from './utils'
import { API_COLLECTIONS, EXCLUDE_STATE, LIMIT, MAX_COLLECT_PAGE, NAMESPACE, STATE } from './ds'
import { CollectionsItem, ListItem } from './types'

export default class ScreenLike extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })
    this.getList()

    return true
  }

  /** 获取用户在看和看过的收藏 */
  fetchCollections = async () => {
    if (!this.userId) {
      info(`此功能依赖收藏数据，请先${i18n.login()}`, 4)
      return false
    }

    const { fetching } = this.state
    if (fetching) return false

    const { type } = this.state
    const data = []

    // 看过
    this.setState({
      fetching: true,
      message: '获取用户收藏',
      current: 1,
      total: MAX_COLLECT_PAGE
    })
    const subjectType = MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(type)
    let result = await request<any>(
      API_COLLECTIONS(
        this.userId,
        subjectType,
        MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('看过')
      )
    )
    if (Array.isArray(result?.data) && result.data.length) {
      data.push(...result.data)

      // 最多 MAX_COLLECT_PAGE 页
      if (result?.total > 100) {
        for (let i = 2; i <= Math.min(Math.ceil(result.total / LIMIT), MAX_COLLECT_PAGE); i += 1) {
          result = await request(
            API_COLLECTIONS(
              this.userId,
              subjectType,
              MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('看过'),
              (i - 1) * LIMIT
            )
          )
          if (Array.isArray(result?.data) && result.data.length) {
            data.push(...result.data)
          }
        }
      }
    }

    // 在看 1 页
    this.setState({
      current: 2
    })
    result = await request<any>(
      API_COLLECTIONS(
        this.userId,
        subjectType,
        MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('在看')
      )
    )
    if (Array.isArray(result?.data) && result.data.length) {
      data.push(...result.data)
    }

    // 想看 1 页
    this.setState({
      current: 3
    })
    result = await request<any>(
      API_COLLECTIONS(
        this.userId,
        subjectType,
        MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('想看')
      )
    )
    if (Array.isArray(result?.data) && result.data.length) {
      data.push(...result.data)
    }

    // 搁置 1 页
    this.setState({
      current: 4
    })
    result = await request<any>(
      API_COLLECTIONS(
        this.userId,
        subjectType,
        MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('搁置')
      )
    )
    if (Array.isArray(result?.data) && result.data.length) {
      data.push(...result.data)
    }

    // 抛弃 1 页
    this.setState({
      current: MAX_COLLECT_PAGE
    })
    result = await request<any>(
      API_COLLECTIONS(
        this.userId,
        subjectType,
        MODEL_COLLECTION_STATUS.getTitle<CollectionStatusValue>('抛弃')
      )
    )
    if (Array.isArray(result?.data) && result.data.length) {
      data.push(...result.data)
    }

    this.setState({
      ...EXCLUDE_STATE
    })

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

    // 预先计算标签的推荐值
    const pattern = /^\d+$|^.*([年月]).*$/
    const tags: Record<string, number> = {}
    data.forEach(item => {
      if (Array.isArray(item.tags)) {
        item.tags.forEach((tag: string) => {
          if (!pattern.test(tag)) {
            if (tag in tags) {
              tags[tag] += 1
            } else {
              tags[tag] = 1
            }
          }
        })
      }
    })

    return data
      .slice()
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
          image: item.subject.images.large.split('/l/')?.[1].split('.jpg')?.[0] || '',
          rank: item.subject.rank || 0,
          score: item.subject.score || 0,
          rate: item.rate || 0,
          type: item.type,
          ep: item.ep_status || 0,
          comment: item.comment?.length || 0,
          private: item.private || false,
          diff: dayDiff(item.updated_at),
          rec
        }
      })
  }

  /** 获取每个条目的猜你喜欢 */
  fetchLike = async (collections: CollectionsItem[]) => {
    const likes: Record<
      SubjectId,
      {
        id: SubjectId
        name: string
        image: string
      }[]
    > = {}
    const nulls: Record<SubjectId, true> = {}

    // 先从云端批量获取
    const fetchIds = collections.map(item => `like_${item.id}`)
    const datas = await gets(fetchIds)
    Object.entries(datas).forEach(([key, item]) => {
      const id = key.replace('like_', '')
      if (!item) {
        nulls[id] = true
      } else {
        likes[id] = item.list || []
      }
    })

    // 对没有记录的在云端条目中进行逐个获取
    const fetchs = Object.keys(nulls).map(key => async () => {
      const data = await get(`subject_${key}`)
      const has = Array.isArray(data?.like) && data.like.length
      likes[key] = has
        ? data.like.map(subject => ({
            id: Number(subject.id),
            name: HTMLDecode(subject.name),
            image: subject.image.replace('//lain.bgm.tv/pic/cover/m/', '').replace('.jpg', '')
          }))
        : []

      // console.info('update', `like_${key}`)
      await update(`like_${key}`, {
        list: likes[key]
      })
      await sleep(40)

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

    // 计算出显示的列表
    const relates: typeof this.state.relates = {}
    const subjects = {}
    collections.forEach(item => {
      ;(likes[item.id] || []).forEach(subject => {
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
            name: subject.name,
            image: subject.image,
            relates: [item.id],
            rate,
            reasons
          }
        }
      })
    })

    this.setState({
      relates,
      ...EXCLUDE_STATE
    })
    return subjects as any
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
              id: Number(key),
              // @ts-expect-error
              ...item
            }))
            .sort((a, b) => desc(a?.rate || -100, b?.rate || -100))
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

    const datas = await gets(fetchIds)
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

  /** 切换类型 */
  onChange = (title: string) => {
    const type = MODEL_SUBJECT_TYPE.getLabel<SubjectType>(title)
    this.setState({
      fetching: true,
      type
    })
    this.save()

    setTimeout(() => {
      this.setState({
        fetching: false
      })
      this.getList()

      t('猜你喜欢.切换', {
        title
      })
    }, 80)
  }

  /** 渲染下一页 */
  onPage = (data: ListItem[]) => {
    if (!data.length) return

    const subjectIds = data.map(item => item.id)
    this.fetchSubjects(subjectIds)
    collectionStore.fetchCollectionStatusQueue(subjectIds)
  }

  /** 预渲染下一页 */
  onNextPage = (data: ListItem[]) => {
    setTimeout(() => {
      if (!data.length) return

      const subjectIds = data.map(item => item.id)
      this.fetchSubjects(subjectIds)
      collectionStore.fetchCollectionStatusQueue(subjectIds)
    }, 2000)
  }

  /** 刷新 */
  onHeaderRefresh = () => {
    return this.getList(true)
  }

  /** 滑动时关闭 Popable 组件 */
  onScroll = () => {
    uiStore.closePopableSubject()
  }

  /** 本地化 */
  save = () => {
    this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  // -------------------- get --------------------
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  relates(subjectId: SubjectId) {
    return computed(() => {
      return this.state.relates[subjectId]
    }).get()
  }

  subjects(subjectId: SubjectId) {
    return computed(() => {
      return this.state.subjects[subjectId]
    }).get()
  }
}
