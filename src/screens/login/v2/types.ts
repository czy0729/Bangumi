/*
 * @Author: czy0729
 * @Date: 2026-10-23 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 10:00:00
 *
 * 页面共用类型: 表单字段 / 登录链路响应 / cookie / 设置项 / 入库参数 / 页面 state
 */
import type { AccessToken } from '@stores/user/types'
import type { Navigation } from '@types'

/** 登录表单字段 */
export type ChangeField = 'email' | 'password' | 'captcha'

/**
 * 登录链路响应
 * - data: 页面 HTML / 文本, 换 token 时为 AccessToken
 * - request: RN XHR 对象, 原生端 base64 图片取 _response, WEB 端取 response
 */
export type LoginResponse<T = string> = {
  /** HTTP 状态码 */
  status?: number

  /** 响应体 */
  data: T

  /** 响应头 */
  headers?: Record<string, string>

  /** 请求对象 */
  request?: {
    /** 原生端原始响应体 */
    _response?: string

    /** WEB 端原始响应体 */
    response?: ArrayBuffer

    /** 最终请求地址 */
    responseURL?: string
  }
}

/** 登录链路需要保留的 cookie key */
export type CookieKey =
  | 'chii_auth'
  | 'chii_cookietime'
  | 'chii_sec'
  | 'chii_sec_id'
  | 'chii_sid'
  | 'chii_theme'

/** 登录链路 cookie */
export type Cookie = Partial<Record<CookieKey, string>>

/** 可从本地恢复的登录设置项 */
export type RestorableSettingKey = 'email' | 'password' | 'isSyncSetting'

/** 只写入、不参与恢复的登录设置项 */
export type WriteOnlySettingKey = 'host' | 'isCommonUA'

/** 本地保存的登录设置项 */
export type LocalSettingKey = RestorableSettingKey | WriteOnlySettingKey

/** 游客账号快照 */
export type TouristResult = {
  /** 授权 token */
  accessToken: AccessToken

  /** 游客 cookie */
  userCookie: {
    /** cookie 串 */
    cookie: string

    /** 请求 UA */
    userAgent: string
  }
}

/** 登录成功入库参数 */
export type SaveLoginParams = {
  /** 登录 cookie */
  cookie: string

  /** 请求 UA */
  userAgent: string

  /** 授权 token */
  accessToken: AccessToken

  /** 导航 */
  navigation: Navigation

  /** 是否登录后同步云端设置, 执行到同步步骤时才读取 */
  isSyncSetting: () => boolean
}

/** 登录页 state */
export type LoginState = {
  /** 当前登录域名 */
  host: string

  /** 是否已展示账号密码表单 */
  clicked: boolean

  /** 邮箱 */
  email: string

  /** 密码 */
  password: string

  /** 验证码 */
  captcha: string

  /** 验证码图片 data URI */
  base64: string

  /** 是否使用固定 UA 登录 */
  isCommonUA: boolean

  /** 是否登录后同步云端设置 */
  isSyncSetting: boolean

  /** 请求中 */
  loading: boolean

  /** 流程提示文案 */
  info: string

  /** 输入框是否聚焦 */
  focus: boolean

  /** 登录是否已最终失败 */
  failed: boolean

  /** 是否因网络问题失败 */
  networkFailed: boolean
}
