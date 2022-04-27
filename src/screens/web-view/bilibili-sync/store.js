/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-27 20:10:05
 */
import { observable, computed } from 'mobx'
import { userStore } from '@stores'
import { getTimestamp, asc, desc } from '@utils'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { info, feedback } from '@utils/ui'
import { t2s } from '@utils/thirdParty/cn-char'
import bangumiData from '@constants/json/thirdParty/bangumiData.min.json'

const HOST_API = 'https://api.bgm.tv'

const namespace = 'ScreenBilibili'

export default class ScreenBilibiliSync extends store {
  state = observable({
    data: {
      list: [],
      _loaded: 0
    },
    reviews: {},
    collections: {},
    bottom: {
      current: 0
    },
    hide: false,
    hideWatched: false,
    hideSame: false,
    privacy: false,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      ...state,
      hide: !!state?.data?.list?.length,
      _loaded: true
    })
  }

  fetchCollection = async subjectId => {
    const collections = {}
    const data = await request(`${HOST_API}/collection/${subjectId}`)
    if (data?.status) {
      collections[subjectId] = {
        status: data.status.type,
        ep_status: data.ep_status,
        private: data.private,
        rating: data.rating,
        comment: data.comment,
        _loaded: getTimestamp()
      }
    }
    this.setState({
      collections
    })
    this.setStorage(undefined, undefined, namespace)
  }

  fetchCollections = async (subjectIds = []) => {
    if (!this.userId) {
      info('此功能依赖收藏数据，请先登录', 4)
      return false
    }

    const collections = {}
    const fetchs = []
    subjectIds.forEach(subjectId => {
      fetchs.push(async () => {
        const data = await request(`${HOST_API}/collection/${subjectId}`)
        if (data?.status) {
          collections[subjectId] = {
            status: data.status.type,
            ep_status: data.ep_status,
            private: data.private,
            rating: data.rating,
            comment: data.comment,
            _loaded: getTimestamp()
          }
        }
        return true
      })
    })

    await queue(fetchs, 2)
    this.setState({
      collections
    })
    this.setStorage(undefined, undefined, namespace)
  }

  // -------------------- get --------------------
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

  onPage = page => {
    const subjectIds = page.filter(item => item.subjectId).map(item => item.subjectId)
    this.fetchCollections(subjectIds)
  }

  setData = list => {
    this.setState({
      data: {
        list: list.map(item => ({
          subjectId:
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
            })?.id || '',
          ...item
        })),
        _loaded: getTimestamp()
      }
    })
    this.setStorage(undefined, undefined, namespace)
  }

  setReviews = reviews => {
    this.setState({
      reviews
    })
    this.setStorage(undefined, undefined, namespace)
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
    this.setStorage(undefined, undefined, namespace)
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
  }

  onToggle = async key => {
    this.setState({
      [key]: !this.state[key]
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
