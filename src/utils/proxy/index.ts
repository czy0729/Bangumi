/*
 * @Author: czy0729
 * @Date: 2026-05-30 06:28:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-30 08:39:56
 */
import { hmacSHA256 } from '@utils/crypto'
import { API_HOST, API_HOST_BACKUP, API_P1 } from '@constants/api'
import { HOST, HOST_IMAGE } from '@constants/constants'
import { WEB } from '@constants/device'
import {
  HOST_PROXY,
  USE_API_HOST_BACKUP,
  USE_WORKER_PROXY,
  WORKER_LAIN_PROXY,
  WORKER_LAIN_SECRET,
  WORKER_PROXY,
  WORKER_SECRET
} from '@src/config'
import { logger } from '../dev'

/** HMAC 签名缓存, 避免重复计算 */
const signCache: Record<string, string> = {}

/** 处理 proxy 替换 */
export function applyProxy(
  url: string,
  headers: Record<string, string> = {},
  isHtml = false
): { url: string; headers: Record<string, string>; proxyType: '' | 'worker' | 'backup' } {
  const newHeaders = { ...headers }
  let proxyUrl = url
  let proxyType: '' | 'worker' | 'backup' = ''

  const isP1 = url.includes(API_P1)
  const isBgm = url.includes(API_HOST) || url.includes(HOST) || isP1

  if (USE_API_HOST_BACKUP && (url.includes(API_HOST) || isP1)) {
    proxyUrl = url.replace(API_HOST, API_HOST_BACKUP).replace(API_P1, API_HOST_BACKUP + '/p1')
    proxyType = 'backup'
  } else if (USE_WORKER_PROXY && isBgm) {
    proxyUrl = url
      .replace(API_HOST, WORKER_PROXY)
      .replace(HOST, WORKER_PROXY)
      .replace(API_P1, WORKER_PROXY)
    newHeaders['x-upstream'] = isHtml ? 'bgm.tv' : isP1 ? 'next.bgm.tv' : 'api.bgm.tv'
    if (WORKER_SECRET) newHeaders['x-proxy-key'] = WORKER_SECRET
    if (newHeaders.Cookie) {
      newHeaders['X-Cookie'] = newHeaders.Cookie
      delete newHeaders.Cookie
    }
    if (newHeaders['User-Agent']) {
      newHeaders['x-user-agent'] = newHeaders['User-Agent']
      delete newHeaders['User-Agent']
    }
    delete newHeaders.host
    delete newHeaders.Host
    delete newHeaders.origin
    delete newHeaders.Origin
    proxyType = 'worker'
  } else if (isHtml && WEB && HOST_PROXY && isBgm) {
    proxyUrl = url.replace(HOST, HOST_PROXY)
  }

  return { url: proxyUrl, headers: newHeaders, proxyType }
}

export function logProxy(method: string, proxyType: string, _url: string, finalUrl: string) {
  if (proxyType) log(`${method} (${proxyType})`, finalUrl)
}

/** 对 axios config 应用 proxy 转换 */
export function applyProxyToAxiosConfig(
  config: { url: string; headers?: Record<string, string>; [key: string]: any },
  isHtml = false
): void {
  if (!USE_WORKER_PROXY) return
  const result = applyProxy(config.url, config.headers || {}, isHtml)
  config.url = result.url
  config.headers = result.headers
}

/** 带 proxy 的 axios 普通请求 */
export async function axiosWithProxy<T = any>(
  axiosFn: (config: any) => Promise<T>,
  config: { url: string; headers?: Record<string, string>; [key: string]: any },
  isHtml = false
): Promise<T> {
  if (USE_WORKER_PROXY) applyProxyToAxiosConfig(config, isHtml)
  return axiosFn(config)
}

/** 带 proxy 的 authorize 重定向请求，自动提取重定向 URL */
export async function axiosWithProxyRedirect(
  axiosFn: (config: any) => Promise<any>,
  config: { url: string; headers?: Record<string, string>; [key: string]: any },
  isHtml = false
): Promise<{ response: any; redirectUrl: string }> {
  if (USE_WORKER_PROXY) {
    if (!config.headers) config.headers = {}
    config.headers['x-no-redirect'] = 'true'
    applyProxyToAxiosConfig(config, isHtml)
  }

  const safeConfig = {
    ...config,
    responseType: 'text',
    validateStatus: () => true
  }

  try {
    const response = await axiosFn(safeConfig)

    // 从 Worker 返回的 JSON body 提取重定向 URL
    let redirectUrl = ''
    if (
      response?.data &&
      typeof response.data === 'string' &&
      response.data.includes('"location"')
    ) {
      try {
        const parsed = JSON.parse(response.data)
        redirectUrl = parsed?.location || ''
      } catch (e) {
        // 静默解析错误
      }
    }

    // 从响应头提取
    if (!redirectUrl) {
      redirectUrl =
        response?.headers?.['x-redirect-url'] ||
        response?.headers?.['X-Redirect-Url'] ||
        response?.headers?.['location'] ||
        response?.headers?.['Location']
    }

    return { response, redirectUrl }
  } catch (error: any) {
    // 降级：从 Error 对象的响应头中提取
    const errResp = error?.response
    const fallbackUrl =
      errResp?.headers?.['x-redirect-url'] ||
      errResp?.headers?.['X-Redirect-Url'] ||
      errResp?.headers?.['location'] ||
      errResp?.headers?.['Location']

    if (fallbackUrl) {
      return { response: errResp, redirectUrl: fallbackUrl }
    }

    throw error
  }
}

/** 若配置了 WORKER_LAIN_PROXY, 将 lain.bgm.tv 图片域名替换为代理地址, 附加 HMAC 签名 */
export function applyLainProxy(url: string) {
  if (!WORKER_LAIN_PROXY || typeof url !== 'string' || !url.includes(HOST_IMAGE)) return url
  const proxyUrl = url.split(HOST_IMAGE).join(WORKER_LAIN_PROXY.replace(/^https?:/, ''))
  if (!WORKER_LAIN_SECRET) return proxyUrl

  // 提取 pathname 用于签名 (不含 query string)
  const pathStart = proxyUrl.indexOf('/', proxyUrl.indexOf('//') + 2)
  const rawPath = pathStart !== -1 ? proxyUrl.slice(pathStart) : '/'
  const pathname = rawPath.split('?')[0]

  // 计算 HMAC-SHA256(secret, pathname), 带缓存
  if (!signCache[pathname]) {
    signCache[pathname] = hmacSHA256(pathname, WORKER_LAIN_SECRET).slice(0, 4)
  }

  const finalUrl = `${proxyUrl}${proxyUrl.includes('?') ? '&' : '?'}v=${signCache[pathname]}`
  // logProxy('image', 'lain', url, finalUrl)
  return finalUrl
}

/** info */
function log(method: string, ...others: any[]) {
  logger.log(`@utils/proxy/${method}`, ...others)
}
