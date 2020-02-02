/*
 * 用户
 * accessToken和登陆时在webview里获取cookie是两套登陆状态, 暂时只能分开维护
 * 一般cookie没多久就过期了
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-02 20:08:05
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import fetch, { fetchHTML, xhr } from '@utils/fetch'
import { HTMLTrim, HTMLDecode } from '@utils/html'
import {
  APP_ID,
  APP_SECRET,
  OAUTH_REDIRECT_URL,
  LIST_EMPTY,
  USERID_TOURIST
} from '@constants'
import {
  API_ACCESS_TOKEN,
  API_USER_INFO,
  API_USER_COLLECTION,
  API_USER_PROGRESS,
  API_EP_STATUS,
  API_SUBJECT_UPDATE_WATCHED,
  API_USER_COLLECTIONS,
  API_USER_COLLECTIONS_STATUS
} from '@constants/api'
import {
  HTML_USERS,
  HTML_ACTION_ERASE_COLLECTION,
  HTML_PM,
  HTML_PM_DETAIL,
  HTML_PM_CREATE
} from '@constants/html'
import RakuenStore from '../rakuen'
import {
  NAMESPACE,
  DEFAULT_SCOPE,
  INIT_ACCESS_TOKEN,
  INIT_USER_INFO,
  INIT_USER_COOKIE
} from './init'
import { cheerioPM, cheerioPMDetail } from './common'

class Store extends store {
  state = observable({
    /**
     * 授权信息
     */
    accessToken: INIT_ACCESS_TOKEN,

    /**
     * 自己用户信息
     */
    userInfo: INIT_USER_INFO,

    /**
     * 用户cookie
     */
    userCookie: INIT_USER_COOKIE,

    /**
     * 在看收藏
     */
    userCollection: LIST_EMPTY,

    /**
     * 收视进度
     */
    userProgress: {
      // [subjectId]: {
      //   [epId]: '看过'
      // }
    },

    /**
     * 用户收藏概览
     */
    userCollections: {
      // [`${type}|${userId}`]: LIST_EMPTY
    },

    /**
     * 某用户信息
     */
    usersInfo: {
      // [userId]: INIT_USER_INFO
    },

    /**
     * 用户收藏统计
     */
    userCollectionsStatus: {
      // [userId]: initUserCollectionsStatus
    },

    /**
     * 用户介绍
     */
    users: {
      // [userId]: ''
    },

    /**
     * 私信
     */
    pm: LIST_EMPTY,

    /**
     * 私信详情
     */
    pmDetail: {
      // [id]: LIST_EMPTY
    }
  })

  init = async () => {
    await this.readStorage(
      [
        'accessToken',
        'userInfo',
        'userCookie',
        'userCollection',
        'userProgress',
        'usersInfo',
        'userCollectionsStatus',
        'pm',
        'pmDetail'
      ],
      NAMESPACE
    )

    if (this.isLogin) {
      const { _loaded } = this.userInfo

      // 用户信息被动刷新, 距离上次4小时候后才请求
      if (!_loaded || getTimestamp() - _loaded > 60 * 60 * 4) {
        this.fetchUserInfo()
        this.fetchUsersInfo()
      }

      try {
        this.doCheckCookie()
      } catch (e) {
        // do nothing
      }
    }

    return true
  }

  // -------------------- get --------------------
  /**
   * 取授权信息
   */
  @computed get accessToken() {
    return this.state.accessToken
  }

  /**
   * 取自己用户信息
   */
  @computed get userInfo() {
    return this.state.userInfo
  }

  /**
   * 取用户cookie (请求HTML用)
   */
  @computed get userCookie() {
    return this.state.userCookie
  }

  /**
   * 取在看收藏
   * @param {*} userId
   */
  @computed get userCollection() {
    return this.state.userCollection
  }

  /**
   * 取收视进度
   * @param {*} subjectId
   */
  userProgress(subjectId) {
    return computed(() => this.state.userProgress[subjectId] || {}).get()
  }

  /**
   * 取用户收藏概览
   * @param {*} scope
   * @param {*} userId
   */
  userCollections(scope = DEFAULT_SCOPE, userId = this.myUserId) {
    return computed(
      () => this.state.userCollections[`${scope}|${userId}`] || LIST_EMPTY
    ).get()
  }

  /**
   * 取某用户信息
   * @param {*} userId
   */
  usersInfo(userId = this.myUserId) {
    return computed(() => this.state.usersInfo[userId] || INIT_USER_INFO).get()
  }

  /**
   * 取某用户收藏统计
   * @param {*} userId
   */
  userCollectionsStatus(userId = this.myUserId) {
    return computed(() => this.state.userCollectionsStatus[userId] || {}).get()
  }

  /**
   * 取某用户介绍
   * @param {*} userId
   */
  users(userId = this.myUserId) {
    return computed(() => this.state.users[userId] || '').get()
  }

  /**
   * 私信
   */
  @computed get pm() {
    return this.state.pm
  }

  /**
   * 私信详情
   */
  pmDetail(id) {
    return computed(() => this.state.pmDetail[id] || LIST_EMPTY).get()
  }

  /**
   * 取自己用户Id
   */
  @computed get myUserId() {
    return this.userInfo.id || this.accessToken.user_id
  }

  /**
   * 取自己用户Id(改过用户名后)
   */
  @computed get myId() {
    return (
      this.userInfo.username || this.userInfo.id || this.accessToken.user_id
    )
  }

  /**
   * 取API是否登陆
   */
  @computed get isLogin() {
    return !!this.accessToken.access_token
  }

  /**
   * 取Web是否登陆
   */
  @computed get isWebLogin() {
    return !!this.userCookie.cookie
  }

  // -------------------- fetch --------------------
  /**
   * 获取授权信息
   * @param {*} code 回调获取的 code
   */
  fetchAccessToken = code =>
    this.fetch(
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
        storage: true,
        namespace: NAMESPACE
      }
    )

  /**
   * 用户信息
   * @param {*} userId
   */
  fetchUserInfo = (userId = this.myUserId) =>
    this.fetch(
      {
        url: API_USER_INFO(userId),
        info: '用户信息'
      },
      'userInfo',
      {
        storage: true,
        namespace: NAMESPACE
      }
    )

  /**
   * 获取某人的在看收藏
   * @param {*} userId
   */
  fetchUserCollection = (userId = this.myUserId) =>
    this.fetch(
      {
        url: `${API_USER_COLLECTION(userId)}?cat=all_watching`,
        info: '在看收藏'
      },
      'userCollection',
      {
        list: true,
        storage: true,
        namespace: NAMESPACE
      }
    )

  /**
   * 获取某人的收视进度
   * @param {*} subjectId
   * @param {*} userId
   */
  fetchUserProgress = async (subjectId, userId = this.myUserId) => {
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

    // @issue 当用户没有收视进度, API_USER_PROGRESS接口服务器直接返回null
    // 注意请求单个返回对象, 多个返回数组
    if (data) {
      // 统一结构
      const _data = Array.isArray(data) ? data : [data]

      // 扁平化
      _data.forEach(item => {
        if (!item.eps) {
          return
        }

        const userProgress = {
          _loaded: getTimestamp()
        }
        item.eps.forEach(i => (userProgress[i.id] = i.status.cn_name))
        this.setState({
          userProgress: {
            [item.subject_id]: userProgress
          }
        })
      })
    } else {
      // 没有数据也要记得设置_loaded
      this.setState({
        userProgress: {
          [subjectId]: {
            _loaded: getTimestamp()
          }
        }
      })
    }
    this.setStorage('userProgress', undefined, NAMESPACE)
    return res
  }

  /**
   * 获取用户收藏概览
   * @param {*} scope
   * @param {*} userId
   */
  fetchUserCollections = async (
    scope = DEFAULT_SCOPE,
    userId = this.myUserId
  ) => {
    const config = {
      url: API_USER_COLLECTIONS(scope, userId),
      data: {
        max_results: 100
      },
      retryCb: () => this.fetchUserCollections(scope, userId),
      info: '收藏概览'
    }
    const res = fetch(config)
    const data = await res

    // 原始数据的结构很臃肿, 扁平一下
    const collections = {
      ...LIST_EMPTY,
      list: [],
      _loaded: getTimestamp()
    }
    if (data) {
      data[0].collects.forEach(item => {
        collections.list.push({
          list: item.list.map(i => i.subject),
          status: item.status.name,
          count: item.count
        })
      })
    }

    const key = 'userCollections'
    const stateKey = `${scope}|${userId}`
    this.setState({
      [key]: {
        [stateKey]: collections
      }
    })

    return res
  }

  /**
   * 获取某用户信息
   * @param {*} userId
   */
  fetchUsersInfo = (userId = this.myUserId) =>
    this.fetch(
      {
        url: API_USER_INFO(userId),
        info: '某用户信息'
      },
      ['usersInfo', userId],
      {
        storage: true,
        namespace: NAMESPACE
      }
    )

  /**
   * 获取用户收藏统计
   * @param {*} userId
   */
  fetchUserCollectionsStatus = (userId = this.myUserId) =>
    this.fetch(
      {
        url: API_USER_COLLECTIONS_STATUS(userId),
        info: '用户收藏统计'
      },
      ['userCollectionsStatus', userId],
      {
        storage: true,
        namespace: NAMESPACE
      }
    )

  /**
   * 用户介绍
   * @param {*} userId
   */
  fetchUsers = async ({ userId } = {}) => {
    // -------------------- 请求HTML --------------------
    const raw = await fetchHTML({
      url: `!${HTML_USERS(userId)}`
    })
    const HTML = HTMLTrim(raw)

    // -------------------- 分析内容 --------------------
    let users = ''
    const matchHTML = HTML.match(
      /<blockquote class="intro"><div class="bio">(.+?)<\/div><\/blockquote>/
    )
    if (matchHTML) {
      users = HTMLDecode(matchHTML[1])
      this.setState({
        users: {
          [userId]: users
        }
      })
    }

    return Promise.resolve(users)
  }

  /**
   * 私信
   */
  fetchPM = async refresh => {
    const { list, pagination } = this.pm
    let page
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    const HTML = await fetchHTML({
      url: HTML_PM(page)
    })
    const key = 'pm'
    const data = {
      list: refresh ? cheerioPM(HTML) : [...list, ...cheerioPM(HTML)],
      pagination: {
        page,
        pageTotal: 100
      },
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: data
    })
    this.setStorage(key, undefined, NAMESPACE)
    return Promise.resolve(data)
  }

  /**
   * 私信详情
   */
  fetchPMDetail = async ({ id }) => {
    const raw = await fetchHTML({
      url: HTML_PM_DETAIL(id),
      raw: true
    })

    // 这个接口会30
    const { url } = raw
    let HTML
    if (url.includes(id)) {
      HTML = await raw.text()
    } else {
      HTML = await fetchHTML({
        url: HTML_PM_DETAIL(url.match(/\d+/g)[0])
      })
    }

    const key = 'pmDetail'
    const data = {
      ...cheerioPMDetail(HTML),
      pagination: {
        page: 1,
        pageTotal: 1
      },
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [id]: data
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
    return Promise.resolve(data)
  }

  // -------------------- page --------------------
  /**
   * 登出
   */
  logout = () => {
    this.setState({
      accessToken: INIT_ACCESS_TOKEN,
      userCookie: INIT_USER_COOKIE,
      userInfo: INIT_USER_INFO
    })
    this.setStorage('accessToken', undefined, NAMESPACE)
    this.setStorage('userCookie', undefined, NAMESPACE)
    this.setStorage('userInfo', undefined, NAMESPACE)
  }

  /**
   * 更新accessToken
   * @param {*} accessToken
   */
  updateAccessToken = (accessToken = INIT_ACCESS_TOKEN) => {
    this.setState({
      accessToken
    })
    this.setStorage('accessToken', undefined, NAMESPACE)
  }

  /**
   * 更新用户cookie
   * @param {*} data
   */
  updateUserCookie = (userCookie = INIT_USER_COOKIE) => {
    this.setState({
      userCookie
    })
    this.setStorage('userCookie', undefined, NAMESPACE)
  }

  /**
   * 打印游客登陆sercet
   */
  logTourist = () => {
    if (this.myUserId !== USERID_TOURIST) {
      return
    }

    log({
      tourist: 1,
      accessToken: this.state.accessToken,
      userCookie: this.state.userCookie
    })
  }

  // -------------------- action --------------------
  /**
   * 更新收视进度
   */
  doUpdateEpStatus = async ({ id, status }) =>
    fetch({
      url: API_EP_STATUS(id, status),
      method: 'POST'
    })

  /**
   * 批量更新收视进度
   */
  doUpdateSubjectWatched = async ({ subjectId, sort }) =>
    fetch({
      url: API_SUBJECT_UPDATE_WATCHED(subjectId),
      method: 'POST',
      data: {
        watched_eps: sort
      }
    })

  /**
   * 检测cookie有没有过期
   * 访问任意个人中心的页面就可以判断
   */
  doCheckCookie = async () => {
    const res = RakuenStore.fetchNotify()
    const raw = await res
    const HTML = HTMLTrim(raw)

    if (HTML.includes('抱歉，当前操作需要您')) {
      this.updateUserCookie()
    }

    return res
  }

  /**
   * 删除收藏
   */
  doEraseCollection = async ({ subjectId, formhash }, success, fail) =>
    xhr(
      {
        url: HTML_ACTION_ERASE_COLLECTION(subjectId, formhash)
      },
      success,
      fail
    )

  /**
   * 发短信
   */
  doPM = async (data, success, fail) =>
    xhr(
      {
        url: HTML_PM_CREATE(),
        data
      },
      success,
      fail
    )
}

export default new Store()
