/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 07:02:30
 */
import { observable, computed } from 'mobx'
import { userStore } from '@stores'
import { getTimestamp, asc, desc } from '@utils'
import store from '@utils/store'
import { queue, t } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { info, feedback } from '@utils/ui'
import { t2s } from '@utils/thirdParty/cn-char'
import i18n from '@constants/i18n'
import bangumiData from '@assets/json/thirdParty/bangumiData.min.json'
import { NAMESPACE, STATE, HOST_API, MEDIA_SUBJECT, LOADED } from './ds'

export default class ScreenBilibiliSync extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      hide: !!state?.data?.list?.length,
      _loaded: true
    })
  }

  fetchCollection = async subjectId => {
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

  fetchCollections = async (subjectIds = []) => {
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

  // -------------------- get --------------------
  @computed get userId() {
    return userStore.usersInfo(userStore.myUserId).username || userStore.myUserId
  }

  @computed get data() {
    const { data, bottom } = this.state
    const { list } = data
    return list
      .slice()
      .sort((a, b) => asc(bottom[a.id] || 0, bottom[b.id] || 0))
      .sort((a, b) => desc(a.subjectId ? 1 : 0, b.subjectId ? 1 : 0))
  }

  review(mediaId) {
    return computed(() => {
      return this.state.reviews[mediaId]
    }).get()
  }

  collection(subjectId) {
    return computed(() => {
      return this.state.collections[subjectId]
    }).get()
  }

  // -------------------- page --------------------
  onToggleHide = () => {
    const { hide } = this.state
    this.setState({
      hide: !hide
    })
  }

  onPage = (page: any[]) => {
    const subjectIds = page.filter(item => item.subjectId).map(item => item.subjectId)
    this.fetchCollections(subjectIds)
  }

  setData = (list: any[]) => {
    this.setState({
      data: {
        list: list.map(item => ({
          subjectId:
            MEDIA_SUBJECT[item.id] ||
            bangumiData.find(i => {
              let flag = i?.s?.b === item.id
              if (!flag) flag = i?.s?.bhmt === item.id
              if (!flag) {
                if (item.title.includes('（僅限港澳台地區）')) {
                  flag = i?.c === t2s(item.title.replace('（僅限港澳台地區）', ''))
                } else {
                  flag = i?.c === item.title
                }
              }
              return flag
            })?.id ||
            '',
          ...item
        })),
        loaded: getTimestamp()
      }
    })
    this.setStorage(NAMESPACE)

    t('bili同步.获取成功', {
      length: list.length,
      userId: this.userId
    })
  }

  setReviews = reviews => {
    this.setState({
      reviews
    })
    this.setStorage(NAMESPACE)
  }

  onBottom = mediaId => {
    const { bottom } = this.state
    const current = bottom.current + 1
    this.setState({
      bottom: {
        current,
        [mediaId]: current
      }
    })
    this.setStorage(NAMESPACE)

    t('bili同步.置底')
  }

  onSubmit = async (subjectId, collectionData, epData) => {
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

    t('bili同步.同步')
  }

  onToggle = async key => {
    this.setState({
      [key]: !this.state[key]
    })
    this.setStorage(NAMESPACE)
  }

  onRefreshCollection = subjectId => {
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
