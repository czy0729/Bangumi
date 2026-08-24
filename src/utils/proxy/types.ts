/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 10:00:00
 */

/** 代理类型: 无 / ECH 本地代理 / Cloudflare Worker / API 反代 / 直连改写 / Web 代理 */
export type ProxyType = '' | 'ech' | 'worker' | 'api' | 'host' | 'web_proxy'

/** 请求配置, 除 url / headers 外兼容 axios 其余任意字段 */
export type ProxyRequestConfig = {
  url: string
  headers?: Record<string, string>
  [key: string]: unknown
}

/** 项目内 axios 封装的响应结构 (错误兜底时字段可能缺失) */
export type ProxyAxiosResponse<T = unknown> = {
  status?: number
  data?: T
  headers?: Record<string, string>
  request?: {
    responseURL?: string

    [key: string]: unknown
  }
}

/**
 * 兼容项目内各 axios 封装 (如 @utils/thirdParty 的 CustomAxios) 的请求函数。
 * 参数声明为 never: 各封装的配置参数类型普遍比运行时实际支持的窄
 * (如 headers 只列了 4 个 key, 而代理需注入 x-upstream 等),
 * 直接以宽参数声明会因函数参数逆变无法通过赋值, 故收窄到 never 以接受一切实现
 */
export type ProxyAxiosFn<T = ProxyAxiosResponse> = (config: never) => Promise<T>
