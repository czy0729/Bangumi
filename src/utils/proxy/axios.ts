/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import { applyProxy } from './apply'
import { getRedirectFromBody, getRedirectFromHeaders } from './redirect'
import { getProxyStrategy } from './strategy'
import { addWorkerLog } from './worker-log'

import type { ProxyAxiosFn, ProxyAxiosResponse, ProxyRequestConfig } from './types'

/** 对 axios config 应用 proxy 转换 (是否需要改写由策略决定) */
export function applyProxyToAxiosConfig(config: ProxyRequestConfig, isHtml: boolean = false): void {
  const result = applyProxy(config.url, config.headers || {}, isHtml)
  config.url = result.url
  config.headers = result.headers
}

/** 带 proxy 的 axios 普通请求 */
export async function axiosWithProxy<T = unknown>(
  axiosFn: ProxyAxiosFn<T>,
  config: ProxyRequestConfig,
  isHtml: boolean = false
): Promise<T> {
  if (getProxyStrategy().enabled) applyProxyToAxiosConfig(config, isHtml)

  const request = axiosFn as (config: ProxyRequestConfig) => Promise<T>
  return request(config)
}

/** 带 proxy 的 authorize 重定向请求，自动提取重定向 URL */
export async function axiosWithProxyRedirect(
  axiosFn: ProxyAxiosFn,
  config: ProxyRequestConfig,
  isHtml: boolean = false
): Promise<{ response: ProxyAxiosResponse; redirectUrl: string }> {
  const strategy = getProxyStrategy()

  // 改写前保存原始地址, 日志展示原始上游域名而非节点域名
  const originalUrl = config.url
  if (strategy.enabled) {
    // Worker 式由节点代为处理重定向, 用 x-no-redirect 让节点以 200 返回重定向地址
    if (strategy.rewriteHeaders) {
      if (!config.headers) config.headers = {}
      config.headers['x-no-redirect'] = 'true'
    }
    applyProxyToAxiosConfig(config, isHtml)
  }

  const safeConfig = {
    ...config,
    responseType: 'text',
    validateStatus: () => true
  }

  // 提取请求域名 (用改写前的地址, 改写后已是节点域名)
  const reqHost = originalUrl?.match(/^https?:\/\/([^/]+)/)?.[1] || ''

  const request = axiosFn as (config: ProxyRequestConfig) => Promise<ProxyAxiosResponse>

  try {
    const response = await request(safeConfig)
    const redirectUrl =
      getRedirectFromBody(response?.data) ||
      getRedirectFromHeaders(response?.headers) ||
      response?.request?.responseURL ||
      ''

    if (redirectUrl) {
      addWorkerLog('success', `${reqHost} → 重定向`, 'host')
    }

    return { response, redirectUrl }
  } catch (error) {
    const err = error as {
      message?: string
      response?: ProxyAxiosResponse
    }
    addWorkerLog('error', `${reqHost} 请求失败: ${err?.message || '未知错误'}`, 'host')

    const errResp = err.response
    const fallbackUrl = getRedirectFromHeaders(errResp?.headers)
    if (errResp && fallbackUrl) return { response: errResp, redirectUrl: fallbackUrl }
    throw error
  }
}
