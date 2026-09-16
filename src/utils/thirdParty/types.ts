/*
 * @Author: czy0729
 * @Date: 2026-07-26 15:12:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 20:30:00
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
  /** 请求方法 (head 由打包的 axios 原生支持, 用于只取响应头) */
  method?: 'get' | 'post' | 'head'

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

    /** 被节点改写的图片鉴权头 (见 utils/proxy/image-headers) */
    'x-upstream'?: string

    /** 节点密钥 */
    'x-proxy-key'?: string
  }

  /** 请求体, 对象或原始字符串 */
  data?: Record<string, unknown> | string

  /** 响应类型, 仅支持二进制数组 */
  responseType?: 'arraybuffer'

  /** 超时时间 (毫秒), 打包的 axios 支持该配置 */
  timeout?: number
}) => Promise<AxiosResponse<T>>

export type CustomAxios = AxiosFunction
