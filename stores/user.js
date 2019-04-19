/*
 * 用户
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-15 15:48:11
 */
import { observable, computed } from 'mobx'
import { APP_ID, APP_SECRET, OAUTH_REDIRECT_URL } from '@constants'
import {
  API_ACCESS_TOKEN,
  API_USER_INFO,
  API_USER_COLLECTION,
  API_USER_PROGRESS,
  API_EP_STATUS,
  API_SUBJECT_UPDATE_WATCHED
} from '@constants/api'
import store from '@utils/store'
import fetch from '@utils/fetch'

const initAccessToken = {
  access_token: '',
  expires_in: 604800,
  token_type: 'Bearer',
  scope: null,
  user_id: 0,
  refresh_token: ''
}
const initUserInfo = {
  avatar: {},
  id: 0,
  nickname: '',
  sign: '',
  url: '',
  usergroup: '',
  username: ''
}

class User extends store {
  state = observable({
    accessToken: initAccessToken,
    userInfo: initUserInfo,
    userCookie: '',
    userCollection: {}, // 'userId': {}
    userProgress: {} // 'userId|subjectId': {}
  })

  async init() {
    const res = Promise.all([
      this.getStorage('accessToken'),
      this.getStorage('userInfo'),
      this.getStorage('userCookie'),
      this.getStorage('userCollection'),
      this.getStorage('userProgress')
    ])
    const state = await res
    this.setState({
      accessToken: state[0],
      userInfo: state[1],
      userCookie: state[2],
      userCollection: state[3],
      userProgress: state[4]
    })
    if (this.isLogin) {
      this.fetchUserInfo()
    }

    return res
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
    return this.userInfo.id || this.accessToken.user_id
  }

  /**
   * 取授权信息
   */
  @computed get accessToken() {
    return this.state.accessToken
  }

  /**
   * 取是否登录
   */
  @computed get isLogin() {
    return !!this.accessToken.access_token
  }

  /**
   * 取用户cookie (请求HTML用)
   */
  @computed get userCookie() {
    return this.state.userCookie
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
   * 获取授权信息
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
      'accessToken',
      {
        storage: true
      }
    )
  }

  /**
   * 用户信息
   * @param {*} userId
   */
  fetchUserInfo(userId = this.myUserId) {
    return this.fetch(
      {
        url: API_USER_INFO(userId),
        info: '用户信息'
      },
      'userInfo',
      {
        storage: true
      }
    )
  }

  /**
   * 获取某人的在看收藏
   * @param {*} userId
   */
  fetchUserCollection(userId = this.myUserId) {
    return this.fetch(
      {
        url: `${API_USER_COLLECTION(userId)}?cat=all_watching`,
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

  // -------------------- page --------------------
  /**
   * @todo 清除所有用户相关缓存
   * 登出
   */
  logout() {
    this.setState({
      accessToken: initAccessToken
    })
    this.setStorage('accessToken')
  }

  /**
   * 更新用户cookie
   * @param {*} data
   */
  updateUserCookie(data) {
    this.setState({
      userCookie: data
    })
    this.setStorage('userCookie')
  }

  // -------------------- action --------------------
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

export default new User()
