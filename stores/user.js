/*
 * 用户
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-28 18:15:28
 */
import { observable, computed } from 'mobx'
import { APP_ID, APP_SECRET, OAUTH_REDIRECT_URL } from '@constants'
import {
  API_ACCESS_TOKEN,
  API_USER_COLLECTION,
  API_USER_PROGRESS,
  API_EP_STATUS,
  API_SUBJECT_UPDATE_WATCHED
} from '@constants/api'
import fetch from '@utils/fetch'
import common from './common'

class User extends common {
  state = observable({
    userInfo: {
      access_token: '',
      expires_in: 604800,
      token_type: 'Bearer',
      scope: null,
      user_id: 0,
      refresh_token: ''
    },
    userCollection: {},
    userProgress: {}
  })

  async init() {
    this.setState({
      userInfo: await this.getStorage('userInfo'),
      userCollection: await this.getStorage('userCollection'),
      userProgress: await this.getStorage('userProgress')
    })
  }

  // -------------------- get --------------------
  /**
   * 取自己用户信息
   */
  @computed get userInfo() {
    return this.state.userInfo
  }

  /**
   * 取自己用户Id
   */
  @computed get myUserId() {
    return this.userInfo.user_id
  }

  /**
   * 取是否登录
   */
  @computed get isLogin() {
    return !!this.userInfo.access_token
  }

  /**
   * 取某人的在看收藏
   * @param {*} userId
   */
  getUserCollection(userId = this.myUserId) {
    return computed(() => this.state.userCollection[userId] || []).get()
  }

  /**
   * 取某人的收视进度
   * @param {*} subjectId
   * @param {*} userId
   */
  getUserProgress(subjectId, userId = this.myUserId) {
    return computed(
      () => this.state.userProgress[`${userId}|${subjectId}`] || {}
    ).get()
  }

  // -------------------- fetch --------------------
  /**
   * oauth获取access_token
   * @param {*} code 回调获取的 code
   */
  fetchAccessToken(code) {
    return this.fetch(
      {
        method: 'POST',
        url: API_ACCESS_TOKEN(),
        data: {
          grant_type: 'authorization_code',
          client_id: APP_ID,
          client_secret: APP_SECRET,
          code,
          redirect_uri: OAUTH_REDIRECT_URL
        },
        info: 'access_token'
      },
      'userInfo'
    )
  }

  /**
   * 获取某人的在看收藏
   * @param {*} userId
   */
  fetchUserCollection(userId = this.myUserId) {
    return this.fetch(
      {
        url: `${API_USER_COLLECTION(userId)}?cat=watching&ids=243916`,
        info: '在看收藏'
      },
      ['userCollection', userId],
      {
        storage: true
      }
    )
  }

  /**
   * 获取某人的收视进度
   * @param {*} subjectId
   * @param {*} userId
   */
  async fetchUserProgress(subjectId, userId = this.myUserId) {
    const config = {
      url: API_USER_PROGRESS(userId),
      data: {},
      retryCb: () => this.fetchUserProgress(subjectId, userId),
      info: '收视进度'
    }
    if (subjectId) {
      config.data.subject_id = subjectId
    }
    const res = fetch(config)
    const data = await res

    // NOTE 当用户没有收视进度, API_USER_PROGRESS接口服务器直接返回null
    // 注意请求单个返回对象, 多个返回数组
    if (data) {
      // 统一结构
      const _data = Array.isArray(data) ? data : [data]
      // 扁平化
      _data.forEach(item => {
        if (!item.eps) return

        const userProgress = {}
        item.eps.forEach(i => (userProgress[i.id] = i.status.cn_name))
        this.setState({
          userProgress: {
            [`${userId}|${item.subject_id}`]: userProgress
          }
        })
        this.setStorage('userProgress')
      })
    }
    return res
  }

  // -------------------- action --------------------
  logout() {}

  /**
   * 更新收视进度
   */
  async doUpdateEpStatus({ id, status }) {
    return fetch({
      url: API_EP_STATUS(id, status),
      method: 'POST'
    })
  }

  /**
   * 批量更新收视进度
   */
  async doUpdateSubjectWatched({ subjectId, sort }) {
    return fetch({
      url: API_SUBJECT_UPDATE_WATCHED(subjectId),
      method: 'POST',
      data: {
        watched_eps: sort
      }
    })
  }
}

const Store = new User()
Store.init()

export default Store
