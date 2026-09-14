/*
 * @Author: czy0729
 * @Date: 2023-06-27 10:01:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 07:47:28
 */
export const COMPONENT = 'LoginV2'

export const NAMESPACE = COMPONENT

export const TITLE = '登录'

export const AUTH_RETRY_COUNT = 2

/** ekibun 客户端一样的 ua */
export const UA_EKIBUN_BANGUMI_APP =
  'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36'

export const WEB_HEADER_PREFIX = 'X-'

/** 登录表单字段 */
export type ChangeField = 'email' | 'password' | 'captcha'

/**
 * 登录链路响应类型
 * - data: 页面 HTML / 文本, 换 token 时为 AccessToken
 * - request: RN XHR 对象, 原生端 base64 图片取 _response, WEB 端取 response
 */
export type LoginResponse<T = string> = {
  status?: number
  data: T
  headers?: Record<string, string>
  request?: {
    _response?: string
    response?: ArrayBuffer
    responseURL?: string
  }
}

/** 登录页 state */
export type LoginState = {
  host: string
  clicked: boolean
  email: string
  password: string
  captcha: string
  base64: string
  isCommonUA: boolean
  isSyncSetting: boolean
  loading: boolean
  info: string
  focus: boolean
  failed: boolean
  networkFailed: boolean
}
