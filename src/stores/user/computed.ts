/*
 * @Author: czy0729
 * @Date: 2023-04-22 16:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 14:24:15
 */
import { computed } from 'mobx'
import { computedFn } from '@utils/computed-fn'
import { APP_USERID_TOURIST, HOST, LIST_EMPTY, UA, WEB } from '@constants'
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
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** 用户介绍 */
  users = computedFn((userId?: UserId) => {
    const ITEM_KEY = userId || this.myUserId
    return (this.state.users[ITEM_KEY] || '') as string
  })

  /** 用户收藏概览 (每种状态最多 25 条数据) */
  userCollections = computedFn((scope = DEFAULT_SCOPE, userId: UserId) => {
    const ITEM_KEY = `${scope}|${userId || this.myUserId}` as const
    return (this.state.userCollections[ITEM_KEY] || LIST_EMPTY) as UserCollections
  })

  /** 新短信参数 */
  pmParams = computedFn((userId: UserId) => {
    return (this.state.pmParams[userId] || {}) as PmParams
  })

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 同一个用户的短信关联集合 */
  private _pmMap = computedFn((userId: UserId) => {
    return (this.state.pmMap[userId] || null) as PmMapItem
  })

  /** 某用户信息 */
  private _usersInfo = computedFn((userId?: UserId) => {
    const ITEM_KEY = userId || this.myUserId
    return (this.state.usersInfo[ITEM_KEY] || INIT_USER_INFO) as typeof INIT_USER_INFO
  })

  /** 收视进度 (章节) */
  private _userProgress = computedFn((subjectId: SubjectId) => {
    return (this.state.userProgress[subjectId] || {}) as UserProgress
  })

  /** 用户收藏统计 (每种状态条目的数量) */
  private _userCollectionsStatus = computedFn((userId: UserId) => {
    const ITEM_KEY = userId || this.myUserId
    return (this.state.userCollectionsStatus[ITEM_KEY] || []) as UserCollectionsStatus
  })

  /** 短信详情 */
  private _pmDetail = computedFn((id: Id) => {
    return (this.state.pmDetail[id] || LIST_EMPTY) as PmDetail
  })

  /** 在线用户最后上报时间集 */
  private _onlines = computedFn((userId: UserId) => {
    const values = this.state.onlines
    if (values[userId]) return Math.floor(Number(values[userId]) / 1000)
    return 0
  })

  /** 我的标签 */
  private _tags = computedFn((subjectType: SubjectType) => {
    return (this.state.tags[subjectType] || LIST_EMPTY) as ListEmpty
  })

  /** @deprecated 授权信息 (api) */
  @computed get accessToken() {
    this.init('accessToken')
    return this.state.accessToken
  }

  /** 用户 cookie (html) */
  @computed get userCookie() {
    this.init('userCookie')
    return this.state.userCookie
  }

  /**
   * 是html中后续在请求头中获取的更新cookie的标志
   * 会随请求一直更新, 并带上请求防止一段时候后掉登录
   */
  @computed get setCookie() {
    this.init('setCookie')
    return this.state.setCookie
  }

  /** @deprecated hm.js 请求 cookie , 区分唯一用户, 一旦获取通常不再变更 */
  @computed get hmCookie() {
    this.init('hmCookie')
    return this.state.hmCookie
  }

  /** 自己用户信息 */
  @computed get userInfo() {
    this.init('userInfo')
    return this.state.userInfo
  }

  /** @deprecated 在看收藏 */
  @computed get userCollection() {
    this.init('userCollection')
    return this.state.userCollection
  }

  /** 在看收藏 (进度页面, 新 API, 取代 userCollection) */
  @computed get collection() {
    this.init('collection')
    return this.state.collection
  }

  /** 表单提交唯一码 */
  @computed get formhash() {
    this.init('formhash')
    return this.state.formhash
  }

  /** 短信收信 */
  @computed get pmIn() {
    this.init('pmIn')
    return this.state.pmIn
  }

  /** 短信发信 */
  @computed get pmOut() {
    this.init('pmOut')
    return this.state.pmOut
  }

  /** 个人设置 */
  @computed get userSetting() {
    this.init('userSetting')
    return this.state.userSetting
  }

  /** 登录是否过期 */
  @computed get outdate() {
    return this.state.outdate
  }

  /** 主站 502 */
  @computed get websiteError() {
    return this.state.websiteError
  }

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

  /** 是否限制内容展示 (防止基本功能滥用) */
  @computed get isLimit() {
    return !this.isLogin || this.userInfo.id == APP_USERID_TOURIST
  }

  /** 进一步限制 (限制绝大部分功能) */
  @computed get isExtremeLimit() {
    return (
      this.isLimit ||
      this.userInfo.avatar?.large?.includes('icon.jpg') ||
      !this.userSetting.show_nsfw_subject
    )
  }

  /** api.v0 需要使用的 headers */
  @computed get requestHeaders() {
    return {
      Authorization: `${this.accessToken.token_type} ${this.accessToken.access_token}`,
      'User-Agent': UA
    } as const
  }

  // -------------------- 导出方法 (分离 init) --------------------
  /** 同一个用户的短信关联集合 */
  pmMap(userId: UserId) {
    this.init('pmMap')
    return this._pmMap(userId)
  }

  /** 某用户信息 */
  usersInfo(userId?: UserId) {
    this.init('usersInfo')
    return this._usersInfo(userId)
  }

  /** 收视进度 (章节) */
  userProgress(subjectId: SubjectId) {
    this.init('userProgress')
    return this._userProgress(subjectId)
  }

  /** 用户收藏统计 (每种状态条目的数量) */
  userCollectionsStatus(userId: UserId) {
    this.init('userCollectionsStatus')
    return this._userCollectionsStatus(userId)
  }

  /** 短信详情 */
  pmDetail(id: Id) {
    this.init('pmDetail')
    return this._pmDetail(id)
  }

  /** 在线用户最后上报时间集 */
  onlines(userId: UserId) {
    if (!userId) return 0
    this.init('onlines')
    return this._onlines(userId)
  }

  /** 我的标签 */
  tags(subjectType: SubjectType) {
    this.init('tags')
    return this._tags(subjectType)
  }
}
