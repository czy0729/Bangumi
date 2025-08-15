/*
 * @Author: czy0729
 * @Date: 2019-07-10 16:01:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-09 01:38:42
 */
import { LIST_EMPTY, MODEL_SUBJECT_TYPE } from '@constants'
import { ImagesAvatar, SubjectType } from '@types'
import { Pm, PmMap, UserCollection } from './types'

export const NAMESPACE = 'User'

export const DEFAULT_SCOPE = MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画')

export const INIT_ACCESS_TOKEN = {
  access_token: '',
  expires_in: 604800,
  token_type: 'Bearer',
  scope: null,
  user_id: 0,
  refresh_token: ''
}

export const INIT_USER_INFO = {
  avatar: {} as ImagesAvatar,
  id: 0,
  nickname: '',
  sign: '',
  url: '',
  usergroup: '',
  username: ''
}

export const INIT_USER_COOKIE: {
  cookie: string
  userAgent: string
  v?: number
  tourist?: number
  setCookie?: string
} = {
  cookie: '',
  userAgent: '',
  v: 0,
  tourist: 0
}

export const INIT_USER_SETTING = {
  sign: '',
  nickname: '',
  sign_input: '',
  formhash: '',
  timeoffsetnew: ''
}

export const STATE = {
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
  collection: LIST_EMPTY as UserCollection,

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
  pmIn: LIST_EMPTY as Pm,

  /** 短信发信 */
  pmOut: LIST_EMPTY as Pm,

  /** 短信详情 */
  pmDetail: {
    0: LIST_EMPTY
  },

  /** 新短信参数 */
  pmParams: {
    0: {}
  },

  /** 同一个用户的短信关联集合 */
  pmMap: {} as PmMap,

  /** 登出地址 */
  // logout: '',

  /** 表单提交唯一码 */
  formhash: '',

  /** 个人设置 */
  userSetting: INIT_USER_SETTING,

  /** 登录是否过期 */
  outdate: false,

  /** 主站 502 */
  websiteError: false,

  /** 在线用户最后上报时间集 */
  onlines: {},

  /** 我的标签 */
  tags: {}
}

export const LOADED = {
  accessToken: false,
  collection: false,
  formhash: false,
  hmCookie: false,
  onlines: false,
  pmDetail: false,
  pmIn: false,
  pmMap: false,
  pmOut: false,
  setCookie: false,
  userCollection: false,
  userCollectionsStatus: false,
  userCookie: false,
  userInfo: false,
  userProgress: false,
  userSetting: false,
  usersInfo: false,
  tags: false
}
