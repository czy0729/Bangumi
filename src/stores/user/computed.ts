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

import type { Id, StoreConstructor, SubjectId, SubjectType, UserId } from '@types'
import type { STATE } from './init'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** 用户介绍 */
  users = computedFn((userId?: UserId) => {
    const STATE_KEY = 'users'
    const ITEM_KEY = userId || this.myUserId

    return this.getState(STATE_KEY, ITEM_KEY, '')
  })

  /** 用户收藏概览 (每种状态最多 25 条数据) */
  userCollections = computedFn((scope = DEFAULT_SCOPE, userId: UserId) => {
    const STATE_KEY = 'userCollections'
    const ITEM_KEY = `${scope}|${userId || this.myUserId}` as const

    return this.getState(STATE_KEY, ITEM_KEY, LIST_EMPTY)
  })

  /** 新短信参数 */
  pmParams = computedFn((userId: UserId) => {
    const STATE_KEY = 'pmParams'
    const ITEM_KEY = userId

    return this.getState(STATE_KEY, ITEM_KEY, {})
  })

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 某用户信息 */
  private _usersInfo = computedFn((userId?: UserId) => {
    const STATE_KEY = 'usersInfo'
    const ITEM_KEY = userId || this.myUserId

    return this.getState(STATE_KEY, ITEM_KEY, INIT_USER_INFO)
  })

  /** 收视进度 (章节) */
  private _userProgress = computedFn((subjectId: SubjectId) => {
    const STATE_KEY = 'userProgress'
    const ITEM_KEY = subjectId

    return this.getState(STATE_KEY, ITEM_KEY, {})
  })

  /** 用户收藏统计 (每种状态条目的数量) */
  private _userCollectionsStatus = computedFn((userId: UserId) => {
    const STATE_KEY = 'userCollectionsStatus'
    const ITEM_KEY = userId || this.myUserId

    return this.getState(STATE_KEY, ITEM_KEY, [])
  })

  /** 短信详情 */
  private _pmDetail = computedFn((id: Id) => {
    const STATE_KEY = 'pmDetail'
    const ITEM_KEY = id

    return this.getState(STATE_KEY, ITEM_KEY, LIST_EMPTY)
  })

  /** 在线用户最后上报时间集 */
  private _onlines = computedFn((userId: UserId) => {
    const STATE_KEY = 'onlines'
    const ITEM_KEY = userId

    const value = this.getState(STATE_KEY, ITEM_KEY)
    if (value) return Math.floor(Number(value) / 1000)
    return 0
  })

  /** 我的标签 */
  private _tags = computedFn((subjectType: SubjectType) => {
    const STATE_KEY = 'tags'
    const ITEM_KEY = subjectType

    return this.getState(STATE_KEY, ITEM_KEY, LIST_EMPTY)
  })

  /** @deprecated 授权信息 (api) */
  @computed get accessToken() {
    const STATE_KEY = 'accessToken'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /** 用户 cookie (html) */
  @computed get userCookie() {
    const STATE_KEY = 'userCookie'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /**
   * 是html中后续在请求头中获取的更新cookie的标志
   * 会随请求一直更新, 并带上请求防止一段时候后掉登录
   */
  @computed get setCookie() {
    const STATE_KEY = 'setCookie'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /** @deprecated hm.js 请求 cookie , 区分唯一用户, 一旦获取通常不再变更 */
  @computed get hmCookie() {
    const STATE_KEY = 'hmCookie'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /** 自己用户信息 */
  @computed get userInfo() {
    const STATE_KEY = 'userInfo'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /** @deprecated 在看收藏 */
  @computed get userCollection() {
    const STATE_KEY = 'userCollection'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /** 在看收藏 (进度页面, 新 API, 取代 userCollection) */
  @computed get collection() {
    const STATE_KEY = 'collection'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /** 表单提交唯一码 */
  @computed get formhash() {
    const STATE_KEY = 'formhash'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /** 短信收信 */
  @computed get pmIn() {
    const STATE_KEY = 'pmIn'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /** 短信发信 */
  @computed get pmOut() {
    const STATE_KEY = 'pmOut'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /** 个人设置 */
  @computed get userSetting() {
    const STATE_KEY = 'userSetting'
    this.init(STATE_KEY)

    return this.getState(STATE_KEY)
  }

  /** 登录是否过期 */
  @computed get outdate() {
    const STATE_KEY = 'outdate'

    return this.getState(STATE_KEY)
  }

  /** 主站 502 */
  @computed get websiteError() {
    const STATE_KEY = 'websiteError'

    return this.getState(STATE_KEY)
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
    return `${HOST}/user/${this.myId || 0}` as const
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
    return WEB ? false : !!this.accessToken.access_token
  }

  /** 是否登录 (客户端内是否获得了网页 cookie) */
  @computed get isWebLogin() {
    return WEB ? false : !!this.userCookie.cookie
  }

  /** 是否登录 (客户端的网页版是否进行了用户令牌设置) */
  @computed get isStorybookLogin() {
    return !WEB ? false : !!this.accessToken.access_token
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
  /** 某用户信息 */
  usersInfo(userId?: UserId) {
    const STATE_KEY = 'usersInfo'
    const ITEM_KEY = userId
    this.init(STATE_KEY)

    return this[`_${STATE_KEY}`](ITEM_KEY)
  }

  /** 收视进度 (章节) */
  userProgress(subjectId: SubjectId) {
    const STATE_KEY = 'userProgress'
    const ITEM_KEY = subjectId
    this.init(STATE_KEY)

    return this[`_${STATE_KEY}`](ITEM_KEY)
  }

  /** 用户收藏统计 (每种状态条目的数量) */
  userCollectionsStatus(userId: UserId) {
    const STATE_KEY = 'userCollectionsStatus'
    const ITEM_KEY = userId
    this.init(STATE_KEY)

    return this[`_${STATE_KEY}`](ITEM_KEY)
  }

  /** 短信详情 */
  pmDetail(id: Id) {
    const STATE_KEY = 'pmDetail'
    const ITEM_KEY = id
    this.init(STATE_KEY)

    return this[`_${STATE_KEY}`](ITEM_KEY)
  }

  /** 在线用户最后上报时间集 */
  onlines(userId: UserId) {
    if (!userId) return 0

    const STATE_KEY = 'onlines'
    const ITEM_KEY = userId
    this.init(STATE_KEY)

    return this[`_${STATE_KEY}`](ITEM_KEY)
  }

  /** 我的标签 */
  tags(subjectType: SubjectType) {
    const STATE_KEY = 'tags'
    const ITEM_KEY = subjectType
    this.init(STATE_KEY)

    return this[`_${STATE_KEY}`](ITEM_KEY)
  }
}
