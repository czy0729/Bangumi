/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:30:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-17 18:24:39
 */
import { observable, computed } from 'mobx'
import { userStore } from '@stores'
import { getTimestamp, asc, desc, info, feedback, sleep } from '@utils'
import store from '@utils/store'
import { queue, t, xhrCustom } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import i18n from '@constants/i18n'
import doubanData from '@assets/json/thirdParty/d.min.json'
import { Id, SubjectId } from '@types'
import {
  NAMESPACE,
  HOST_API,
  STATE,
  EXCLUDE_STATE,
  LOADED,
  LOADED_TOTAL_EPS
} from './ds'
import { DoubanStatus, DoubanCollection, StateData } from './types'

export default class ScreenBilibiliSync extends store {
  state = observable(STATE)

  collections: StateData['list'] = []

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      hide: !!state?.data?.list?.length,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    const { data, progress } = this.state
    if (!data.list.length && !progress.fetching) {
      this.fetchDouban('done', 1, false)
    }
  }

  fetchDouban = async (
    status: DoubanStatus = 'done',
    page: number = 1,
    message: boolean = true
  ) => {
    if (!this.doubanId) {
      if (message) info('匹配豆瓣 ID 有误，请核实')
      return false
    }

    const limit = 40
    const start = (page - 1) * limit
    try {
      this.setState({
        progress: {
          fetching: true
        }
      })

      const { _response } = await xhrCustom({
        url: `https://m.douban.com/rexxar/api/v2/user/${this.doubanId}/interests?type=movie&status=${status}&start=${start}&count=${limit}&ck=PylB&for_mobile=1`,
        headers: {
          Referer: 'https://m.douban.com'
        }
      })
      const { interests = [], total } = JSON.parse(_response) as DoubanCollection
      interests.forEach(item => {
        this.collections.push({
          id: item.subject?.id,
          subjectId: doubanData[item.subject?.id] || 0,
          title: item.subject?.title,
          cover: item.subject?.pic?.normal || '',
          status: item.status === 'mark' ? 1 : item.status === 'doing' ? 2 : 3,
          progress:
            item.status === 'done' ? (item.subject?.type === 'movie' ? '1话' : 0) : 0,
          content: item.comment || '',
          score: item?.rating?.value || 0,
          create_time: item.create_time || '0'
        })
      })
      await sleep()

      const cnStatus = status === 'mark' ? '想看' : status === 'doing' ? '在看' : '看过'
      this.setState({
        progress: {
          fetching: true,
          message: `正在获取${cnStatus}收藏`,
          current: page,
          total: Math.floor(total / limit) + 1
        }
      })

      const end = page * limit
      if (end < total) {
        this.fetchDouban(status, page + 1)
      } else if (status === 'done') {
        this.fetchDouban('doing', 1)
      } else if (status === 'doing') {
        this.fetchDouban('mark', 1)
      } else {
        this.onToggleHide()
        this.setState({
          data: {
            list: this.collections.sort((a, b) => desc(a.create_time, b.create_time)),
            _loaded: getTimestamp()
          },
          progress: EXCLUDE_STATE.progress
        })

        info(`已获取 ${this.collections.length} 个收藏`)
        feedback()
        t('豆瓣同步.获取成功', {
          length: this.collections.length,
          userId: this.userId
        })

        this.collections = []
        this.setStorage(NAMESPACE)
      }
    } catch (error) {
      info('获取数据出错，请检查')
      feedback()
      this.setState({
        progress: EXCLUDE_STATE.progress
      })
    }
  }

  fetchCollection = async (subjectId: SubjectId) => {
    const collections = {}
    const data: any = await request(`${HOST_API}/collection/${subjectId}`)
    if (data?.status) {
      collections[subjectId] = {
        status: data.status.type,
        ep_status: data.ep_status,
        private: data.private,
        rating: data.rating,
        comment: data.comment,
        loaded: getTimestamp()
      }
    } else {
      collections[subjectId] = {
        loaded: getTimestamp()
      }
    }
    this.setState({
      collections
    })
    this.setStorage(NAMESPACE)
  }

  fetchCollections = async (subjectIds: SubjectId[] = []) => {
    if (!this.userId) {
      info(`此功能依赖收藏数据，请先${i18n.login()}`, 4)
      return false
    }

    const collections = {}
    const fetchs = []
    subjectIds.forEach(subjectId => {
      if (LOADED[subjectId]) return

      LOADED[subjectId] = true
      fetchs.push(async () => {
        const data: any = await request(`${HOST_API}/collection/${subjectId}`)
        if (data?.status) {
          collections[subjectId] = {
            status: data.status.type,
            ep_status: data.ep_status,
            private: data.private,
            rating: data.rating,
            comment: data.comment,
            loaded: getTimestamp()
          }
        } else {
          collections[subjectId] = {
            loaded: getTimestamp()
          }
        }
        return true
      })
    })

    await queue(fetchs, 2)
    this.setState({
      collections
    })
    this.setStorage(NAMESPACE)
  }

  /** 豆瓣数据没有总集数，若条目为看过，需要额外获取条目的总集数然后一并全部标记 */
  fetchTotalEps = async (subjectIds: SubjectId[] = []) => {
    const totalEps = {}
    const fetchs = []

    subjectIds.forEach(subjectId => {
      if (LOADED_TOTAL_EPS[subjectId]) return

      LOADED_TOTAL_EPS[subjectId] = true
      fetchs.push(async () => {
        try {
          const data: any = await request(
            `${HOST_API}/v0/subjects/${subjectId}?responseGroup=small`
          )
          if (data?.total_episodes || data?.eps) {
            totalEps[subjectId] = data?.total_episodes || data?.eps || 0
          }
        } catch (error) {}

        return true
      })
    })

    await queue(fetchs, 2)
    this.setState({
      totalEps
    })
    this.setStorage(NAMESPACE)
  }

  // -------------------- get --------------------
  @computed get doubanId() {
    const { doubanId } = this.state
    if (!doubanId) return ''

    if (doubanId.includes('://')) {
      return doubanId.split('/people/')[1]?.split('/')[0]
    }

    return doubanId
  }

  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  @computed get data() {
    const { data, bottom } = this.state
    const { list } = data
    return list
      .sort((a, b) => asc(bottom[a.id] || 0, bottom[b.id] || 0))
      .sort((a, b) => desc(a.subjectId ? 1 : 0, b.subjectId ? 1 : 0))
  }

  @computed get matchCount() {
    const { data } = this.state
    let count = 0
    data.list.forEach(item => {
      if (item.subjectId) count += 1
    })
    return count
  }

  collection(subjectId: SubjectId) {
    return computed(() => {
      return this.state.collections[subjectId]
    }).get()
  }

  totalEps(subjectId: SubjectId) {
    return computed(() => {
      return this.state.totalEps[subjectId] || 0
    }).get()
  }

  // -------------------- page --------------------
  onChange = (doubanId: string) => {
    this.setState({
      doubanId: doubanId.trim()
    })
  }

  onToggleHide = () => {
    const { hide } = this.state
    this.setState({
      hide: !hide
    })
    this.setStorage(NAMESPACE)
  }

  onPage = (page: any[]) => {
    this.fetchCollections(
      page.filter(item => item.subjectId).map(item => item.subjectId)
    )

    // 只查询没有进度和看过的条目
    this.fetchTotalEps(
      page
        .filter(item => item.subjectId && !item.progress && item.status === 3)
        .map(item => item.subjectId)
    )
  }

  onBottom = (mediaId: Id) => {
    const { bottom } = this.state
    const current = bottom.current + 1
    this.setState({
      bottom: {
        current,
        [mediaId]: current
      }
    })
    this.setStorage(NAMESPACE)

    t('豆瓣同步.置底')
  }

  onSubmit = async (subjectId: SubjectId, collectionData, epData) => {
    if (!subjectId) return false

    if (Object.keys(collectionData).length) {
      const { privacy } = this.state
      await request(`${HOST_API}/collection/${subjectId}/update`, {
        ...collectionData,
        privacy: privacy ? 1 : 0
      })
    }

    if (Object.keys(epData).length) {
      await request(`${HOST_API}/subject/${subjectId}/update/watched_eps`, {
        watched_eps: epData.ep || 0
      })
    }

    await this.fetchCollection(subjectId)
    feedback()

    t('豆瓣同步.同步')
  }

  onToggle = async (key: string) => {
    this.setState({
      [key]: !this.state[key]
    })
    this.setStorage(NAMESPACE)
  }

  onRefreshCollection = (subjectId: SubjectId) => {
    this.setState({
      collections: {
        [subjectId]: {
          ...(this.collection(subjectId) || {}),
          loaded: 0
        }
      }
    })

    setTimeout(() => {
      this.fetchCollection(subjectId)
    }, 0)
  }
}
