/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:41:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-11 01:21:55
 */
import { computed, observable } from 'mobx'
import { systemStore, userStore } from '@stores'
import { asc, desc, HTMLDecode, info, queue, sleep, confirm } from '@utils'
import store from '@utils/store'
import { request } from '@utils/fetch.v0'
import { get, gets, update } from '@utils/kv'
import { MODEL_SUBJECT_TYPE } from '@constants'
import i18n from '@constants/i18n'
import { SubjectId, SubjectType, SubjectTypeValue } from '@types'
import { NAMESPACE, STATE, EXCLUDE_STATE, HOST_API_V0, LIMIT } from './ds'
import { calc } from './utils'
import { CollectionsItem } from './types'

export default class ScreenLike extends store {
  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })
    this.getList()
  }

  /** 获取用户在看和看过的收藏 */
  fetchCollections = async () => {
    if (!this.userId) {
      info(`此功能依赖收藏数据，请先${i18n.login()}`, 4)
      return false
    }

    this.setState({
      fetching: true,
      message: '获取用户收藏',
      current: 1,
      total: 2
    })

    const data = []

    // 看过
    const { type } = this.state
    const subjectType = MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>(type)
    let result = await request<any>(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${subjectType}&type=2&limit=${LIMIT}`
    )
    if (Array.isArray(result?.data)) {
      data.push(...result?.data)

      // 非高级会员只请求 1 页
      if (systemStore.advance) {
        // 最多请求 5 页
        if (result?.total > 100) {
          for (let i = 2; i <= Math.min(Math.ceil(result.total / LIMIT), 5); i += 1) {
            result = await request(
              `${HOST_API_V0}/users/${
                this.userId
              }/collections?subject_type=${subjectType}&type=2&offset=${
                (i - 1) * LIMIT
              }&limit=${LIMIT}`
            )
            data.push(...result?.data)
          }
        }
      }
    }

    this.setState({
      current: 2
    })

    // 在看最多请求 1 页
    result = await request<any>(
      `${HOST_API_V0}/users/${this.userId}/collections?subject_type=${subjectType}&type=3&limit=${LIMIT}`
    )
    if (Array.isArray(result?.data)) data.push(...result?.data)

    this.setState({
      ...EXCLUDE_STATE
    })

    if (!data.length) {
      setTimeout(() => {
        confirm(
          '没有获取到任何该类型的收藏数据，也有可能是授权信息过期了，尝试重新授权后再次获取？',
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

    return data
      .slice()
      .sort((a, b) => asc(a.updated_at, b.updated_at))
      .map(item => ({
        id: item.subject_id,
        name: item.subject.name_cn || item.subject.name,
        image: item.subject.images.large.split('/l/')?.[1].split('.jpg')?.[0] || '',
        rank: item.subject.rank || 0,
        score: item.subject.score || 0,
        rate: item.rate
      }))
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
            image: subject.image
              .replace('//lain.bgm.tv/pic/cover/m/', '')
              .replace('.jpg', '')
          }))
        : []

      console.info('update', `like_${key}`)
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
    const subjects: typeof this.state.subjects = {}
    collections.forEach(item => {
      ;(likes[item.id] || []).forEach(subject => {
        if (subjects[subject.id]) {
          subjects[subject.id].relates.push(item.id)
          subjects[subject.id].rate += calc(item, subjects[subject.id].relates.length)
        } else {
          relates[item.id] = {
            ...item
          }
          subjects[subject.id] = {
            name: subject.name,
            image: subject.image,
            rate: calc(item),
            relates: [item.id]
          }
        }
      })
    })

    this.setState({
      relates,
      ...EXCLUDE_STATE
    })
    return subjects
  }

  /** 生成列表数据 */
  getList = async (refresh: boolean = false) => {
    const { type } = this.state
    if (!refresh && this.state.list[type].length) return

    const collections = await this.fetchCollections()
    if (!collections) return false

    const subjects = await this.fetchLike(collections)
    this.setState({
      list: {
        [type]: Object.entries(subjects)
          .map(([key, item]) => ({
            id: Number(key),
            ...item
          }))
          .sort((a, b) => desc(a.rate, b.rate))
      }
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

    setTimeout(() => {
      this.setState({
        fetching: false
      })
      this.getList()
    }, 80)
  }

  save = () => {
    this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  // -------------------- get --------------------
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }
}
