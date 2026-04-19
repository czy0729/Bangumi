/*
 * @Author: czy0729
 * @Date: 2023-04-22 16:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 14:24:15
 */
import { computed } from 'mobx'
import { APP_USERID_IOS_AUTH, APP_USERID_TOURIST, HOST, LIST_EMPTY, UA, WEB } from '@constants'
import { DEFAULT_SCOPE, INIT_USER_INFO } from './init'
import State from './state'

import type { Id, ListEmpty, StoreConstructor, SubjectId, SubjectType, UserId } from '@types'
import type { STATE } from './init'
import type {
  PmDetail,
  PmMapItem,
  PmParams,
  UserCollections,
  UserCollectionsStatus,
  UserProgress
} from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 授权信息 (api) */
  @computed get accessToken() {
    const STATE_KEY = 'accessToken'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /** 用户 cookie (html) */
  @computed get userCookie() {
    const STATE_KEY = 'userCookie'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /**
   * 是html中后续在请求头中获取的更新cookie的标志
   * 会随请求一直更新, 并带上请求防止一段时候后掉登录
   */
  @computed get setCookie() {
    const STATE_KEY = 'setCookie'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /** @deprecated hm.js 请求 cookie , 区分唯一用户, 一旦获取通常不再变更 */
  @computed get hmCookie() {
    const STATE_KEY = 'hmCookie'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /** 自己用户信息 */
  @computed get userInfo() {
    const STATE_KEY = 'userInfo'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /** @deprecated 在看收藏 */
  @computed get userCollection() {
    const STATE_KEY = 'userCollection'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /** 在看收藏 (进度页面, 新 API, 取代 userCollection) */
  @computed get collection() {
    const STATE_KEY = 'collection'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /** 表单提交唯一码 */
  @computed get formhash() {
    const STATE_KEY = 'formhash'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /** 短信收信 */
  @computed get pmIn() {
    const STATE_KEY = 'pmIn'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /** 短信发信 */
  @computed get pmOut() {
    const STATE_KEY = 'pmOut'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /** 同一个用户的短信关联集合 */
  pmMap(userId: UserId) {
    const STATE_KEY = 'pmMap'
    this.init(STATE_KEY)

    return computed(() => {
      const ITEM_KEY = userId
      return (this.state[STATE_KEY][ITEM_KEY] || null) as PmMapItem
    }).get()
  }

  /** 个人设置 */
  @computed get userSetting() {
    const STATE_KEY = 'userSetting'
    this.init(STATE_KEY)

    return this.state[STATE_KEY]
  }

  /** 登录是否过期 */
  @computed get outdate() {
    const STATE_KEY = 'outdate'

    return this.state[STATE_KEY]
  }

  /** 主站 502 */
  @computed get websiteError() {
    const STATE_KEY = 'websiteError'

    return this.state[STATE_KEY]
  }

  /** 某用户信息 */
  usersInfo(userId?: UserId) {
    const STATE_KEY = 'usersInfo'
    this.init(STATE_KEY)

    return computed(() => {
      const ITEM_KEY = userId || this.myUserId
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_USER_INFO) as typeof INIT_USER_INFO
    }).get()
  }

  /** 用户介绍 */
  users(userId?: UserId) {
    const STATE_KEY = 'users'

    return computed(() => {
      const ITEM_KEY = userId || this.myUserId
      return (this.state[STATE_KEY][ITEM_KEY] || '') as string
    }).get()
  }

  /** 收视进度 (章节) */
  userProgress(subjectId: SubjectId) {
    const STATE_KEY = 'userProgress'
    this.init(STATE_KEY)

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state[STATE_KEY][ITEM_KEY] || {}) as UserProgress
    }).get()
  }

  /** 用户收藏概览 (每种状态最多 25 条数据) */
  userCollections(scope = DEFAULT_SCOPE, userId: UserId) {
    const STATE_KEY = 'userCollections'

    return computed(() => {
      const ITEM_KEY = `${scope}|${userId || this.myUserId}` as const
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as UserCollections
    }).get()
  }

  /** 用户收藏统计 (每种状态条目的数量) */
  userCollectionsStatus(userId: UserId) {
    const STATE_KEY = 'userCollectionsStatus'
    this.init(STATE_KEY)

    return computed(() => {
      const ITEM_KEY = userId || this.myUserId
      return (this.state[STATE_KEY][ITEM_KEY] || []) as UserCollectionsStatus
    }).get()
  }

  /** 短信详情 */
  pmDetail(id: Id) {
    const STATE_KEY = 'pmDetail'
    this.init(STATE_KEY)

    return computed(() => {
      const ITEM_KEY = id
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as PmDetail
    }).get()
  }

  /** 新短信参数 */
  pmParams(userId: UserId) {
    const STATE_KEY = 'pmParams'

    return computed(() => {
      const ITEM_KEY = userId
      return (this.state[STATE_KEY][ITEM_KEY] || {}) as PmParams
    }).get()
  }

  /** 在线用户最后上报时间集 */
  onlines(userId: UserId) {
    if (!userId) return 0

    const STATE_KEY = 'onlines'
    this.init(STATE_KEY)

    return computed<number>(() => {
      const ITEM_KEY = userId
      const values = this.state[STATE_KEY]
      if (values[ITEM_KEY]) return Math.floor(Number(values[ITEM_KEY]) / 1000)

      return 0
    }).get()
  }

  /** 我的标签 */
  tags(subjectType: SubjectType) {
    const STATE_KEY = 'tags'
    this.init(STATE_KEY)

    return computed(() => {
      const ITEM_KEY = subjectType
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as ListEmpty
    }).get()
  }

  // -------------------- computed --------------------
  /** 自己用户 Id (数字) */
  @computed get myUserId() {
    return this.userInfo.id || this.accessToken.user_id
  }

  /** 自己用户 ID (改过后的) */
  @computed get myId() {
    return this.userInfo.username || this.userInfo.id || this.accessToken.user_id
  }

  /** 用户空间地址 */
  @computed get url() {
    return `${HOST}/user/${this.myId || 0}`
  }

  /** 有新短信 */
  @computed get hasNewPM() {
    return this.pmIn.list.findIndex(item => item.new) !== -1
  }

  /** 是否开发者 */
  @computed get isDeveloper() {
    return this.myUserId == 456208
  }

  /** 是否登录 (客户端内是否获得了 api 鉴权) */
  @computed get isLogin() {
    if (WEB) return false

    return !!this.accessToken.access_token
  }

  /** 是否登录 (客户端内是否获得了网页 cookie) */
  @computed get isWebLogin() {
    if (WEB) return false

    return !!this.userCookie.cookie
  }

  /** 是否登录 (客户端的网页版是否进行了用户令牌设置) */
  @computed get isStorybookLogin() {
    if (!WEB) return false

    return !!this.accessToken.access_token
  }

  /** 是否限制内容展示 (用于审核) */
  @computed get isLimit() {
    const { id } = this.userInfo

    return !this.isLogin || id == APP_USERID_TOURIST || id == APP_USERID_IOS_AUTH
  }

  /** 进一步限制 (限制绝大部分功能) */
  @computed get isExtremeLimit() {
    const { avatar } = this.userInfo

    return this.isLimit || avatar?.large?.includes('icon.jpg')
  }

  /** api.v0 需要使用的 headers */
  @computed get requestHeaders() {
    return {
      Authorization: `${this.accessToken.token_type} ${this.accessToken.access_token}`,
      'User-Agent': UA
    } as const
  }
}
