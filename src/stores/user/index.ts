/*
 * 用户 (自己视角)
 *  - accessToken 和登录时在 webview 里获取 cookie 是两套登录状态, 暂时只能分开维护
 *  - 一般 cookie 没多久就过期了
 *
 * @Author: czy0729
 * @Date: 2019-02-21 20:40:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-08 20:14:50
 */
import { observable, computed, toJS } from 'mobx'
import cheerio from 'cheerio-without-node-native'
import { HTMLDecode, HTMLTrim, getTimestamp, loading, urlStringify, info } from '@utils'
import store from '@utils/store'
import fetch, { fetchHTML, xhr } from '@utils/fetch'
import { fetchCollectionSingleV0, fetchCollectionV0 } from '@utils/fetch.v0'
import { onlines, report } from '@utils/kv'
import axios from '@utils/thirdParty/axios'
import {
  API_ACCESS_TOKEN,
  API_EP_STATUS,
  API_SUBJECT_UPDATE_WATCHED,
  API_USER_COLLECTION,
  API_USER_COLLECTIONS,
  API_USER_COLLECTIONS_STATUS,
  API_USER_INFO,
  API_USER_PROGRESS,
  APP_ID,
  APP_SECRET,
  APP_USERID_IOS_AUTH,
  APP_USERID_TOURIST,
  DEV,
  HOST,
  HTML_ACTION_ERASE_COLLECTION,
  HTML_PM,
  HTML_PM_CREATE,
  HTML_PM_DETAIL,
  HTML_PM_OUT,
  HTML_PM_PARAMS,
  HTML_USERS,
  HTML_USER_SETTING,
  IOS,
  LIST_EMPTY,
  UA,
  URL_OAUTH_REDIRECT,
  VERSION_GOOGLE,
  getOTA
} from '@constants'
import {
  CollectionStatusCn,
  EpId,
  EpStatus,
  Id,
  ListEmpty,
  StoreConstructor,
  SubjectId,
  SubjectType,
  UserId
} from '@types'
import RakuenStore from '../rakuen'
import {
  DEFAULT_SCOPE,
  INIT_ACCESS_TOKEN,
  INIT_USER_COOKIE,
  INIT_USER_INFO,
  INIT_USER_SETTING,
  NAMESPACE
} from './init'
import {
  cheerioPM,
  cheerioPMDetail,
  cheerioPMParams,
  cheerioUserSetting
} from './common'
import {
  CollectionsItem,
  CollectionsStatusItem,
  PmItem,
  PmParamsItem,
  UserCollection
} from './types'

const state = {
  /** 授权信息 */
  accessToken: INIT_ACCESS_TOKEN,

  /** 自己用户信息 */
  userInfo: {
    ...INIT_USER_INFO,
    _loaded: 0
  },

  /** 用户 cookie (请求html用) */
  userCookie: INIT_USER_COOKIE,

  /**
   * 是html中后续在请求头中获取的更新cookie的标志
   * 会随请求一直更新, 并带上请求防止一段时候后掉登录
   */
  setCookie: '',

  /** @deprecated hm.js 请求 cookie , 区分唯一用户, 一旦获取通常不再变更 */
  hmCookie: '',

  /** @deprecated 在看收藏 */
  userCollection: LIST_EMPTY,

  /** 在看收藏 (新 API, 取代 userCollection) */
  collection: LIST_EMPTY,

  /** 收视进度 (章节) */
  userProgress: {
    0: {}
  },

  /** 用户收藏概览 */
  userCollections: {
    0: LIST_EMPTY
  },

  /** 某用户信息 */
  usersInfo: {
    0: INIT_USER_INFO
  },

  /** 用户收藏统计 (每种状态条目的数量) */
  userCollectionsStatus: {
    0: []
  },

  /** 用户介绍 */
  users: {
    0: ''
  },

  /** 短信收信 */
  pmIn: LIST_EMPTY,

  /** 短信发信 */
  pmOut: LIST_EMPTY,

  /** 短信详情 */
  pmDetail: {
    0: LIST_EMPTY
  },

  /** 新短信参数 */
  pmParams: {
    0: {}
  },

  /** 登出地址 */
  logout: '',

  /** 表单提交唯一码 */
  formhash: '',

  /** 个人设置 */
  userSetting: INIT_USER_SETTING,

  /** 登录是否过期 */
  outdate: false,

  /** 在线用户最后上报时间集 */
  onlines: {}
}

class UserStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  init = async () => {
    await this.readStorage(
      [
        'accessToken',
        'formhash',
        'pmDetail',
        'pmIn',
        'pmOut',
        'collection',
        'userCollection',
        'userCollectionsStatus',
        'userCookie',
        'setCookie',
        'hmCookie',
        'userInfo',
        'userProgress',
        'usersInfo',
        'userSetting',
        'onlines'
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

      setTimeout(() => {
        try {
          this.doCheckCookie()
        } catch (error) {}
      }, 4000)
    }
    return true
  }

  // -------------------- get --------------------
  /** 授权信息 (api) */
  @computed get accessToken() {
    return this.state.accessToken
  }

  /** 用户 cookie (html) */
  @computed get userCookie() {
    return this.state.userCookie
  }

  /**
   * 是html中后续在请求头中获取的更新cookie的标志
   * 会随请求一直更新, 并带上请求防止一段时候后掉登录
   */
  @computed get setCookie() {
    return this.state.setCookie
  }

  /** @deprecated hm.js 请求 cookie , 区分唯一用户, 一旦获取通常不再变更 */
  @computed get hmCookie() {
    return this.state.hmCookie
  }

  /** 自己用户信息 */
  @computed get userInfo() {
    return this.state.userInfo
  }

  /** @deprecated 在看收藏 */
  @computed get userCollection(): UserCollection {
    return this.state.userCollection
  }

  /** 在看收藏 (新 API, 取代 userCollection) */
  @computed get collection(): UserCollection {
    return this.state.collection
  }

  /** 表单提交唯一码 */
  @computed get formhash() {
    return this.state.formhash
  }

  /** 短信收信 */
  @computed get pmIn() {
    return this.state.pmIn
  }

  /** 短信发信 */
  @computed get pmOut() {
    return this.state.pmOut
  }

  /** 个人设置 */
  @computed get userSetting() {
    return this.state.userSetting
  }

  /** 登录是否过期 */
  @computed get outdate() {
    return this.state.outdate
  }

  /** 某用户信息 */
  usersInfo(userId?: UserId) {
    return computed<typeof INIT_USER_INFO>(() => {
      const { usersInfo } = this.state
      const key = userId || this.myUserId
      return usersInfo[key] || INIT_USER_INFO
    }).get()
  }

  /** 用户介绍 */
  users(userId?: UserId) {
    return computed<string>(() => {
      const { users } = this.state
      const key = userId || this.myUserId
      return users[key] || ''
    }).get()
  }

  /** 收视进度 (章节) */
  userProgress(subjectId: SubjectId) {
    return computed<{
      [K: EpId]: CollectionStatusCn
    }>(() => {
      const { userProgress } = this.state
      return userProgress[subjectId] || {}
    }).get()
  }

  /** 用户收藏概览 (每种状态最多25条数据) */
  userCollections(scope = DEFAULT_SCOPE, userId: UserId) {
    return computed<ListEmpty<CollectionsItem>>(() => {
      const { userCollections } = this.state
      const key = `${scope}|${userId || this.myUserId}`
      return userCollections[key] || LIST_EMPTY
    }).get()
  }

  /** 用户收藏统计 (每种状态条目的数量) */
  userCollectionsStatus(userId: UserId) {
    return computed<CollectionsStatusItem[]>(() => {
      const { userCollectionsStatus } = this.state
      const key = userId || this.myUserId
      return userCollectionsStatus[key] || []
    }).get()
  }

  /** 短信详情 */
  pmDetail(id: Id) {
    return computed<ListEmpty<PmItem>>(() => {
      const { pmDetail } = this.state
      return pmDetail[id] || LIST_EMPTY
    }).get()
  }

  /** 新短信参数 */
  pmParams(userId: UserId) {
    return computed<PmParamsItem>(() => {
      const { pmParams } = this.state
      return pmParams[userId] || {}
    }).get()
  }

  /** 在线用户最后上报时间集 */
  onlines(userId: UserId) {
    if (!userId) return 0

    return computed<number>(() => {
      const { onlines } = this.state
      if (onlines[userId]) {
        return Math.floor(Number(onlines[userId]) / 1000)
      }
      return 0
    }).get()
  }

  // -------------------- computed --------------------
  /** 自己用户 Id (数字) */
  @computed get myUserId() {
    return this.userInfo.id || this.accessToken.user_id
  }

  /** 自己用户 Id (改过后的) */
  @computed get myId() {
    return this.userInfo.username || this.userInfo.id || this.accessToken.user_id
  }

  /** 用户空间地址 */
  @computed get url() {
    return `${HOST}/user/${this.myId}`
  }

  /** 有新短信 */
  @computed get hasNewPM() {
    return this.pmIn.list.findIndex(item => item.new) !== -1
  }

  /** 是否开发者 */
  @computed get isDeveloper() {
    return this.myUserId == 456208
  }

  /** 是否登录 (api) */
  @computed get isLogin() {
    return !!this.accessToken.access_token
  }

  /** 是否登录 (web) */
  @computed get isWebLogin() {
    return !!this.userCookie.cookie
  }

  /** 是否限制内容展示, 用于审核 */
  @computed get isLimit() {
    if (!VERSION_GOOGLE) return false
    if (IOS || !VERSION_GOOGLE) return false

    const { GOOGLE_AUTH } = getOTA()
    if (!GOOGLE_AUTH) return false
    if (!this.isLogin) return true

    const { id } = this.userInfo
    if (!id || id == APP_USERID_TOURIST || id == APP_USERID_IOS_AUTH) return true
    return false
  }

  /** api.v0 需要使用的 headers */
  @computed get requestHeaders() {
    return {
      Authorization: `${this.accessToken.token_type} ${this.accessToken.access_token}`,
      'User-Agent': UA
    }
  }

  // -------------------- fetch --------------------
  /**
   * 获取授权信息
   * @param {*} code 回调获取的 code
   */
  fetchAccessToken = (code: string) => {
    return this.fetch(
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
  }

  /** 用户信息 */
  fetchUserInfo = (userId: UserId = this.myUserId) => {
    return this.fetch(
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
  }

  /** @deprecated 获取某人的在看收藏 */
  fetchUserCollection = (userId: UserId = this.myUserId) => {
    return this.fetch(
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
  }

  /** 获取在看收藏 (新 API, 取代 userCollection) */
  fetchCollection = async (userId: UserId = this.myId) => {
    const collection = await fetchCollectionV0({
      userId
    })

    // 这样可能是 access_token 过期了, 需要主动刷新 access_token
    if (!collection.list.length && this.collection.list.length >= 2) return null

    this.setState({
      collection
    })

    this.setStorage('collection', undefined, NAMESPACE)
    return collection
  }

  /** 获取并更新单个在看收藏 */
  fetchCollectionSingle = async (subjectId: SubjectId, userId: UserId = this.myId) => {
    const data = await fetchCollectionSingleV0({
      userId,
      subjectId
    })
    if (!data) return false

    const index = this.collection.list.findIndex(
      item => item.subject_id === data.subject_id
    )
    if (index === -1) return false

    const collection = toJS(this.collection)
    collection.list[index] = data
    this.setState({
      collection
    })
    this.setStorage('collection', undefined, NAMESPACE)
    return true
  }

  /** 获取某人的收视进度 */
  fetchUserProgress = async (subjectId?: SubjectId, userId: UserId = this.myUserId) => {
    const config = {
      url: API_USER_PROGRESS(userId),
      data: {} as {
        subject_id?: SubjectId
      },
      retryCb: () => this.fetchUserProgress(subjectId, userId),
      info: '收视进度'
    }
    if (subjectId) config.data.subject_id = subjectId

    const res = fetch(config)
    const data = await res

    // @issue 当用户没有收视进度, API_USER_PROGRESS接口服务器直接返回null
    // 注意请求单个返回对象, 多个返回数组
    if (data) {
      // 统一结构
      const _data = Array.isArray(data) ? data : [data]

      // 扁平化
      _data.forEach(item => {
        if (!item.eps) return

        const userProgress = {
          _loaded: 1
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
            _loaded: 1
          }
        }
      })
    }
    this.setStorage('userProgress', undefined, NAMESPACE)

    return res
  }

  /** 获取用户收藏概览 */
  fetchUserCollections = async (
    scope: SubjectType = DEFAULT_SCOPE,
    userId: UserId = this.myUserId
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

  /** 获取某用户信息 */
  fetchUsersInfo = (userId: UserId = this.myUserId) => {
    return this.fetch(
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
  }

  /** 获取用户收藏统计 */
  fetchUserCollectionsStatus = (userId: UserId = this.myUserId) => {
    return this.fetch(
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
  }

  /** 用户介绍 */
  fetchUsers = async (config: { userId?: UserId }) => {
    const { userId } = config || {}

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

    return users
  }

  /** 短信 */
  fetchPM = async (refresh?: boolean, key: 'pmIn' | 'pmOut' = 'pmIn') => {
    const { list, pagination } = this[key]
    const page = refresh ? 1 : pagination.page + 1

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

    return data
  }

  /** 短信详情 */
  fetchPMDetail = async (config: { id?: Id }) => {
    const { id } = config || {}
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

    return data
  }

  /** 新短信参数 */
  fetchPMParams = async (config: { userId?: Id }) => {
    const { userId } = config || {}

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

    return data
  }

  /** 个人设置 */
  fetchUserSetting = async () => {
    const HTML = await fetchHTML({
      url: HTML_USER_SETTING()
    })

    const key = 'userSetting'
    const data = {
      ...cheerioUserSetting(HTML),
      _loaded: getTimestamp()
    }

    this.setState({
      [key]: data
    })
    return data
  }

  /** 在线用户最后上报时间集 */
  fetchOnlines = async () => {
    if (!this.myId) return false

    const result = await report(this.myId)
    if (result?.code === 200) {
      const data = await onlines()
      if (typeof data === 'object') {
        const key = 'onlines'
        this.setState({
          [key]: data
        })
        this.setStorage(key, undefined, NAMESPACE)
        return data
      }
    }
    return false
  }

  // -------------------- method --------------------
  /** 登出 */
  logout = () => {
    setTimeout(() => {
      this.setState({
        accessToken: INIT_ACCESS_TOKEN,
        userCookie: INIT_USER_COOKIE,
        setCookie: '',
        userInfo: INIT_USER_INFO,
        outdate: false
      })
      this.setStorage('accessToken', undefined, NAMESPACE)
      this.setStorage('userCookie', undefined, NAMESPACE)
      this.setStorage('setCookie', undefined, NAMESPACE)
      this.setStorage('userInfo', undefined, NAMESPACE)
    }, 0)
  }

  /** 更新 accessToken */
  updateAccessToken = (accessToken: any = INIT_ACCESS_TOKEN) => {
    this.clearState('accessToken', {})
    this.setState({
      accessToken: {
        access_token: accessToken.access_token,
        expires_in: accessToken.expires_in,
        token_type: accessToken.token_type,
        scope: accessToken.scope,
        user_id: accessToken.user_id,
        refresh_token: accessToken.refresh_token
      }
    })
    this.setStorage('accessToken', undefined, NAMESPACE)
  }

  /** 更新用户 cookie */
  updateUserCookie = (userCookie = INIT_USER_COOKIE) => {
    this.setState({
      userCookie,
      outdate: false
    })
    this.setStorage('userCookie', undefined, NAMESPACE)
  }

  /** @deprecated */
  updateHmCookie = (hmCookie: string) => {
    this.setState({
      hmCookie
    })
    this.setStorage('hmCookie', undefined, NAMESPACE)
  }

  /** 打印游客登录 sercet */
  logTourist = () => {
    // if (LOG_LEVEL <= 0) return
    // log({
    //   tourist: 1,
    //   accessToken: this.state.accessToken,
    //   userCookie: this.state.userCookie
    // })
  }

  /** 设置授权信息过期提示 */
  setOutdate = () => {
    this.setState({
      outdate: true
    })
  }

  /** 删掉在看收藏的条目信息 */
  removeCollection = (subjectId: SubjectId) => {
    const index = this.collection.list.findIndex(item => item.subject_id === subjectId)
    if (index === -1) return false

    const collection = toJS(this.collection)
    collection.list.splice(index, 1)
    this.setState({
      collection
    })
    this.setStorage('collection', undefined, NAMESPACE)
    return true
  }

  // -------------------- action --------------------
  /** 更新收视进度 */
  doUpdateEpStatus = async (config: { id: EpId; status: EpStatus }) => {
    const { id, status } = config || {}
    return fetch({
      url: API_EP_STATUS(id, status),
      method: 'POST'
    })
  }

  /** 批量更新收视进度 */
  doUpdateSubjectWatched = async (config: { subjectId: SubjectId; sort: number }) => {
    const { subjectId, sort } = config || {}
    return fetch({
      url: API_SUBJECT_UPDATE_WATCHED(subjectId),
      method: 'POST',
      data: {
        watched_eps: sort
      }
    })
  }

  /**
   * 检测cookie有没有过期
   *  - 访问任意个人中心的页面就可以判断, 顺便记录formhash用于登出
   *  - setCookie是html中后续在请求头中获取的更新cookie的标志
   */
  doCheckCookie = async () => {
    const data = await RakuenStore.fetchNotify()
    const { setCookie = '', html } = data
    if (html.includes('抱歉，当前操作需要您') && !DEV) {
      this.setOutdate()
    }

    const matchLogout = html.match(/.tv\/logout(.+?)">登出<\/a>/)
    if (Array.isArray(matchLogout) && matchLogout[1]) {
      this.setState({
        // logout: `${HOST}/logout${matchLogout[1]}`,
        formhash: matchLogout[1].replace('/', '')
      })
      this.setStorage('formhash', undefined, NAMESPACE)
    }

    if (setCookie) {
      this.setState({
        setCookie
      })
      this.setStorage('setCookie', undefined, NAMESPACE)
    }

    return data
  }

  /** 删除收藏 */
  doEraseCollection = async (
    config: {
      subjectId: SubjectId
      formhash: string
    },
    success?: () => any,
    fail?: () => any
  ) => {
    const { subjectId, formhash } = config || {}
    return xhr(
      {
        url: HTML_ACTION_ERASE_COLLECTION(subjectId, formhash)
      },
      success,
      fail
    )
  }

  /** 发短信 */
  doPM = async (
    data: {
      msg_title: string
      msg_body: string
      formhash: string
      msg_receivers: string
      submit: '发送' | '回复'
    },
    success?: () => any,
    fail?: () => any
  ) => {
    return xhr(
      {
        url: HTML_PM_CREATE(),
        data
      },
      success,
      fail
    )
  }

  /** 更新个人设置 */
  doUpdateUserSetting = async (
    data: {
      formhash: string
      nickname: string
      sign_input: string
      newbio: string
      timeoffsetnew: string
    },
    success?: () => any,
    fail?: () => any
  ) => {
    return xhr(
      {
        url: HTML_USER_SETTING(),
        data: {
          ...data,
          submit: '保存修改'
        }
      },
      success,
      fail
    )
  }

  /** 当前获取 access_token 重试次数 */
  oauthRetryCount: number = 0

  /** 存放 loading.hide */
  hide: any

  /** 获取授权表单码 */
  reOauth = async () => {
    this.hide = loading('正在重新授权...')

    // @ts-ignore
    axios.defaults.withCredentials = false

    // @ts-ignore
    const { data } = await axios({
      method: 'get',
      url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
      headers: {
        'User-Agent': this.userCookie.userAgent,
        Cookie: this.userCookie.cookie
      }
    })

    const formhash = cheerio.load(data)('input[name=formhash]').attr('value')
    return this.authorize(formhash)
  }

  /** 授权获取 code */
  authorize = async formhash => {
    // @ts-ignore
    axios.defaults.withCredentials = false

    // @ts-ignore
    const { request } = await axios({
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': this.userCookie.userAgent,
        Cookie: this.userCookie.cookie
      },
      data: urlStringify({
        formhash,
        redirect_uri: '',
        client_id: APP_ID,
        submit: '授权'
      })
    })

    const code = request?.responseURL?.split('=').slice(1).join('=')
    try {
      return this.getAccessToken(code)
    } catch (error) {
      this.oauthRetryCount += 1
      if (this.oauthRetryCount >= 6) {
        if (typeof this.hide === 'function') {
          this.hide()
          this.hide = null
        }
        info('重新授权失败，请重新登录')
        this.logout()
        return false
      }
      return this.getAccessToken(code)
    }
  }

  /** code 获取 access_token */
  getAccessToken = async code => {
    // @ts-ignore
    axios.defaults.withCredentials = false

    // @ts-ignore
    const { status, data } = await axios({
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      url: `${HOST}/oauth/access_token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': this.userCookie.userAgent
      },
      data: urlStringify({
        grant_type: 'authorization_code',
        client_id: APP_ID,
        client_secret: APP_SECRET,
        code,
        redirect_uri: URL_OAUTH_REDIRECT,
        state: getTimestamp()
      })
    })

    if (status !== 200) {
      throw new TypeError(status)
    }

    this.oauthRetryCount = 0
    if (typeof this.hide === 'function') {
      this.hide()
      this.hide = null
    }
    this.updateAccessToken(data)
    return true
  }
}

export default new UserStore()
