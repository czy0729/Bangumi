/*
 * @Author: czy0729
 * @Date: 2026-07-26 15:12:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 09:43:52
 */
type AxiosRequest = {
  /** XMLHttpRequest 原始响应字符串 */
  _response: string
}

type AxiosResponse<T> = {
  /** HTTP 状态码 */
  status: number

  /** 底层 XMLHttpRequest 实例 */
  request: AxiosRequest

  /** 响应数据, 类型由调用时泛型 T 决定 */
  data: T

  /** 响应头 */
  headers: Record<string, string>
}

type AxiosFunction = <T = any>(config: {
  /** 请求方法 */
  method?: 'get' | 'post'

  /** 请求地址 */
  url: string

  /** 请求头 */
  headers?: {
    /** 内容类型 */
    'Content-Type'?: 'application/json' | 'application/x-www-form-urlencoded'

    /** 用户代理 */
    'User-Agent'?: string

    /** 鉴权信息 */
    Authorization?: string

    /** 来源地址 */
    Referer?: string
  }

  /** 请求体, 对象或原始字符串 */
  data?: Record<string, unknown> | string

  /** 响应类型, 仅支持二进制数组 */
  responseType?: 'arraybuffer'
}) => Promise<AxiosResponse<T>>

type AxiosExtensions = {
  defaults: {
    /** 是否携带跨域凭证 */
    withCredentials?: boolean

    /** 请求超时时间 (毫秒) */
    timeout?: number
  }

  /** 仅发起 HEAD 请求, 返回状态码与响应头 */
  head: (url: string) => Promise<{ status: number; headers: Record<string, string> }>
}

export type CustomAxios = AxiosFunction & AxiosExtensions
