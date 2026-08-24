/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 10:00:00
 */
import { syncSystemStore } from '../async'
import { applyProxy } from './apply'
import { addWorkerLog } from './worker-log'

import type { ProxyAxiosFn, ProxyAxiosResponse, ProxyRequestConfig } from './types'

/** 对 axios config 应用 proxy 转换 */
export function applyProxyToAxiosConfig(config: ProxyRequestConfig, isHtml: boolean = false): void {
  const { workerProxy } = syncSystemStore().setting
  if (!workerProxy) return

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
  if (syncSystemStore().setting.workerProxy) applyProxyToAxiosConfig(config, isHtml)

  const request = axiosFn as (config: ProxyRequestConfig) => Promise<T>
  return request(config)
}

/** 从响应头中提取重定向 URL */
function getRedirectFromHeaders(headers: Record<string, string> = {}): string {
  return (
    headers['x-redirect-url'] ||
    headers['X-Redirect-Url'] ||
    headers['location'] ||
    headers['Location'] ||
    ''
  )
}

/** 从 Worker JSON body 中提取重定向 URL */
function getRedirectFromBody(data: unknown): string {
  if (typeof data !== 'string' || !data.includes('"location"')) return ''
  try {
    const parsed = JSON.parse(data) as { location?: unknown } | null
    return typeof parsed?.location === 'string' ? parsed.location : ''
  } catch {
    return ''
  }
}

/** 带 proxy 的 authorize 重定向请求，自动提取重定向 URL */
export async function axiosWithProxyRedirect(
  axiosFn: ProxyAxiosFn,
  config: ProxyRequestConfig,
  isHtml: boolean = false
): Promise<{ response: ProxyAxiosResponse; redirectUrl: string }> {
  const { workerProxyDisabled, workerProxy, workerProxyDirect } = syncSystemStore().setting
  if (!workerProxyDisabled && workerProxy) {
    if (!workerProxyDirect) {
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

  // 提取请求域名
  const reqHost = config.url?.match(/^https?:\/\/([^/]+)/)?.[1] || ''

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
