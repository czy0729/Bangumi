/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-26 08:35:34
 */
import { observable, computed } from 'mobx'
import { userStore } from '@stores'
import { getTimestamp, desc } from '@utils'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { request } from '@utils/fetch.v0'
import { info } from '@utils/ui'
import bangumiData from '@constants/json/thirdParty/bangumiData.min.json'

const HOST_API = 'https://api.bgm.tv'
const DISTANCE = 60 * 60 * 24

const namespace = 'ScreenBilibiliSync'

export default class ScreenBilibiliSync extends store {
  state = observable({
    data: {
      list: [],
      _loaded: 0
    },
    reviews: {},
    collections: {},
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      ...state,
      _loaded: true
    })
  }

  fetchCollections = async (subjectIds = []) => {
    if (!this.userId) {
      info('此功能依赖收藏数据，请先登录', 4)
      return false
    }

    const now = getTimestamp()
    const collections = {}
    const fetchs = []
    subjectIds.forEach(subjectId => {
      // const collection = this.collection(subjectId)
      // if (collection?._loaded && now - collection.loaded <= DISTANCE) return

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
    const { list } = this.state.data
    return list.sort((a, b) => desc(a.subjectId ? 1 : 0, b.subjectId ? 1 : 0))
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
  onPage = page => {
    const subjectIds = page.filter(item => item.subjectId).map(item => item.subjectId)
    this.fetchCollections(subjectIds)
  }

  setData = list => {
    this.setState({
      data: {
        list: list.map(item => ({
          subjectId: bangumiData.find(i => i?.s?.b === item.id)?.id || '',
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
}
