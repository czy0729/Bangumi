/*
 * @Author: czy0729
 * @Date: 2026-09-19 09:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 09:34:25
 *
 * 请求层核心类型
 */
export type Config = {
  method: 'get' | 'post'
  url: string
  headers: {
    Authorization?: string
    'User-Agent'?: string
    'Content-Type'?: 'application/x-www-form-urlencoded'
  }
  data?: string

  /** 请求超时 (毫秒), 透传给 axios; 缺省时 axios 为永不超时 */
  timeout?: number
}

export type RequestConfig = {
  timeout?: number
  auth?: boolean
  onError?: (ex: Error) => void
}

/** 各调用模块的差异选项 */
export type RequestOptions = {
  /** logProxy 日志标签 */
  tag: string

  /** 是否拼 app_id / state 防接口 CDN 缓存 */
  state: boolean

  /** applyProxy 第三参 isHtml */
  html: boolean
}
