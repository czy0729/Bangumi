/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:14:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-21 00:03:49
 */
import type { AnyObject } from '@types'

/** 底层请求配置，直接传递给网络库 */
export type Config = {
  /** 请求方法 */
  method?: 'GET' | 'POST'

  /** 请求头 */
  headers?: {
    [key: string]: any
  }

  /** 超时时间（毫秒） */
  timeout?: number

  /** 请求体字符串 */
  body?: string
}

/** API 请求体 */
export type Body = {
  /** 应用 ID */
  app_id: string

  /** 状态 */
  state?: number
}

/** fetch API 的调用参数 */
export type FetchAPIArgs = {
  /** 请求方法 */
  method?: 'GET' | 'POST'

  /** 请求地址 */
  url: string

  /** 请求参数 */
  data?: AnyObject

  /** 失败重试回调 */
  retryCb?: any

  /** 调试信息，打印在日志中 */
  info?: string

  /** 是否不显示加载指示器 */
  noConsole?: boolean
}

/** fetch HTML 页面的参数 */
export type FetchHTMLArgs = {
  /** 请求方法 */
  method?: 'GET' | 'POST'

  /** 请求地址 */
  url: string

  /** 请求参数 */
  data?: AnyObject

  /** 自定义请求头 */
  headers?: AnyObject

  /** Cookie 字符串 */
  cookie?: string

  /** 是否返回原始数据（不解析） */
  raw?: boolean

  /** 是否自动阻止重复请求 */
  autoPrevent?: boolean
}

/** XHR 请求参数 */
export type XHRArgs = {
  /** 请求方法 */
  method?: 'GET' | 'POST'

  /** 请求地址 */
  url: string

  /** 请求数据 */
  data?: AnyObject

  /** 是否不显示加载指示器 */
  noConsole?: boolean
}

/** 自定义 XHR 请求参数（底层） */
export type XHRCustomArgs = {
  /** 请求方法（支持 PUT） */
  method?: 'GET' | 'POST' | 'PUT'

  /** 请求地址 */
  url: string

  /** 请求数据 */
  data?: object | string

  /** 自定义请求头 */
  headers?: {
    [key: string]: string
  }

  /** 响应数据类型 */
  responseType?: '' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text'

  /** 是否携带跨域凭据 */
  withCredentials?: boolean

  /** 是否显示日志 */
  showLog?: boolean
}
