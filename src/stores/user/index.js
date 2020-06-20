/*
 * 用户
 * accessToken和登陆时在webview里获取cookie是两套登陆状态, 暂时只能分开维护
 * 一般cookie没多久就过期了
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-19 12:13:07
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import fetch, { fetchHTML, xhr } from '@utils/fetch'
import { HTMLTrim, HTMLDecode } from '@utils/html'
import { confirm } from '@utils/ui'
import {
  DEV,
  IOS,
  HOST,
  APP_ID,
  APP_SECRET,
  URL_OAUTH_REDIRECT,
  LIST_EMPTY,
  APP_USERID_TOURIST,
  APP_USERID_IOS_AUTH
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
  HTML_PM_OUT,
  HTML_PM_DETAIL,
  HTML_PM_CREATE,
  HTML_PM_PARAMS
} from '@constants/html'
import RakuenStore from '../rakuen'
import {
  NAMESPACE,
  DEFAULT_SCOPE,
  INIT_ACCESS_TOKEN,
  INIT_USER_INFO,
  INIT_USER_COOKIE
} from './init'
import { cheerioPM, cheerioPMDetail, cheerioPMParams } from './common'

class User extends store {
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
     * 用户cookie (请求HTML用)
     */
    userCookie: INIT_USER_COOKIE,

    /**
     * 在看收藏
     */
    userCollection: LIST_EMPTY,

    /**
     * 收视进度
     * @param {*} subjectId
     * {
     *   [epId]: '看过'
     * }
     */
    userProgress: {
      0: {}
    },

    /**
     * 用户收藏概览
     * @param {*} scope
     * @param {*} userId
     */
    userCollections: {
      _: (scope = DEFAULT_SCOPE, userId) =>
        `${scope}|${userId || this.myUserId}`,
      0: LIST_EMPTY
    },

    /**
     * 某用户信息
     * @param {*} userId
     */
    usersInfo: {
      _: userId => userId || this.myUserId,
      0: INIT_USER_INFO
    },

    /**
     * 用户收藏统计
     * @param {*} userId
     */
    userCollectionsStatus: {
      _: userId => userId || this.myUserId,
      0: {}
    },

    /**
     * 用户介绍
     * @param {*} userId
     */
    users: {
      _: userId => userId || this.myUserId,
      0: ''
    },

    /**
     * 短信收信
     */
    pmIn: LIST_EMPTY,

    /**
     * 短信发信
     */
    pmOut: LIST_EMPTY,

    /**
     * 短信详情
     * @param {*} id
     */
    pmDetail: {
      0: LIST_EMPTY
    },

    /**
     * 新短信参数
     * @param {*} userId
     */
    pmParams: {
      0: {}
    },

    /**
     * 登出地址
     */
    logout: ''
  })

  init = async () => {
    await this.readStorage(
      [
        'accessToken',
        'pmDetail',
        'pmIn',
        'pmOut',
        'userCollection',
        'userCollectionsStatus',
        'userCookie',
        'userInfo',
        'userProgress',
        'usersInfo'
      ],
      NAMESPACE
    )

    if (this.isWebLogin) {
      const { _loaded } = this.userInfo

      // 用户信息被动刷新, 距离上次4小时候后才请求
      if (!_loaded || getTimestamp() - _loaded > 60 * 60 * 4) {
        this.fetchUserInfo()
        this.fetchUsersInfo()
      }

      try {
        this.doCheckCookie()
      } catch (ex) {
        // do nothing
      }
    }
    return true
  }

  // -------------------- get --------------------
  /**
   * 有新短信
   */
  @computed get hasNewPM() {
    return this.pmIn.list.findIndex(item => item.new) !== -1
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

  /**
   * 限制内容展示
   */
  @computed get isLimit() {
    if (!IOS) {
      return false
    }

    if (!this.isLogin) {
      return true
    }

    const { id } = this.userInfo
    if (!id || id == APP_USERID_TOURIST || id == APP_USERID_IOS_AUTH) {
      return true
    }

    return false
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
          redirect_uri: URL_OAUTH_REDIRECT
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
   * 短信
   * @param {*} key pmIn | pmOut
   */
  fetchPM = async (refresh, key = 'pmIn') => {
    const { list, pagination } = this[key]
    let page
    if (refresh) {
      page = 1
    } else {
      page = pagination.page + 1
    }

    const HTML = await fetchHTML({
      url: key === 'pmOut' ? HTML_PM_OUT(page) : HTML_PM(page)
    })
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
   * 短信详情
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

  /**
   * 新短信参数
   */
  fetchPMParams = async ({ userId }) => {
    const HTML = await fetchHTML({
      url: HTML_PM_PARAMS(userId)
    })
    const key = 'pmParams'
    const data = {
      ...cheerioPMParams(HTML),
      _loaded: getTimestamp()
    }
    this.setState({
      [key]: {
        [userId]: data
      }
    })
    return Promise.resolve(data)
  }

  // -------------------- page --------------------
  /**
   * 登出
   */
  logout = () => {
    // const { logout } = this.state
    // if (logout) {
    //   xhr({
    //     method: 'GET',
    //     url: logout
    //   })
    // }

    setTimeout(() => {
      this.setState({
        accessToken: INIT_ACCESS_TOKEN,
        userCookie: INIT_USER_COOKIE,
        userInfo: INIT_USER_INFO
      })
      this.setStorage('accessToken', undefined, NAMESPACE)
      this.setStorage('userCookie', undefined, NAMESPACE)
      this.setStorage('userInfo', undefined, NAMESPACE)
    }, 0)
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
    // if (this.myUserId !== APP_USERID_TOURIST) {
    //   return
    // }

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
   * 顺便记录formhash用于登出
   */
  doCheckCookie = async () => {
    const res = RakuenStore.fetchNotify()
    const raw = await res
    const HTML = HTMLTrim(raw)
    if (HTML.includes('抱歉，当前操作需要您') && !DEV) {
      confirm('检测到登陆状态好像过期了, 是否登出?', () =>
        this.updateUserCookie()
      )
    } else {
      const matchLogout = HTML.match(/.tv\/logout(.+?)">登出<\/a>/)
      if (Array.isArray(matchLogout) && matchLogout[1]) {
        this.setState({
          logout: `${HOST}/logout${matchLogout[1]}`
        })
      }
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

const Store = new User()
Store.setup()

export default Store
