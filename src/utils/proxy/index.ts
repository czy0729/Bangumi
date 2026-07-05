/*
 * @Author: czy0729
 * @Date: 2026-05-30 06:28:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 05:18:53
 */
import { API_HOST, API_HOST_BACKUP, API_P1 } from '@constants/api'
import { HOST, HOST_IMAGE } from '@constants/constants'
import { WEB } from '@constants/device'
import { HOST_PROXY } from '@src/config'
import { syncSystemStore } from '../async'
import { hmacSHA256 } from '../crypto'
import { logger } from '../dev'
import { isEchProxyRunning } from './ech'
import { addWorkerLog } from './worker-log'

/** HMAC 签名缓存, 避免重复计算 */
const signCache: Record<string, string> = {}

/** 需要删除或重命名的 hop-by-hop header */
const HOP_HEADERS = ['host', 'Host', 'origin', 'Origin'] as const

/** 需要转发到 worker 的 header 映射 */
const FORWARD_HEADERS: Record<string, string> = {
  Cookie: 'X-Cookie',
  'User-Agent': 'x-user-agent'
}

/** 处理 proxy 替换 */
export function applyProxy(
  url: string,
  headers: Record<string, string> = {},
  isHtml = false
): {
  url: string
  headers: Record<string, string>
  proxyType: '' | 'ech' | 'worker' | 'api' | 'host' | 'web_proxy' // 建议增加类型
} {
  const { workerProxyDisabled, workerProxy, workerSecret, workerProxyDirect, workerApiProxy } =
    syncSystemStore().setting

  // 1. ECH 代理运行时, OkHttp 已走本地代理, 无需 URL 替换
  if (isEchProxyRunning()) return { url, headers: { ...headers }, proxyType: 'ech' }

  // 2. 全局禁用代理时直接返回原始值
  if (workerProxyDisabled) return { url, headers: { ...headers }, proxyType: '' }

  const newHeaders = { ...headers }
  let proxyUrl = url
  let proxyType: '' | 'ech' | 'worker' | 'api' | 'host' | 'web_proxy' = ''

  const isHost = url.includes(HOST)
  const isApi = url.includes(API_HOST) || url.includes(API_HOST_BACKUP)
  const isNextApi = url.includes(API_P1)

  // 3. API 代理分支
  if (workerApiProxy && isApi) {
    const replacement = workerApiProxy.replace(/\/$/, '')
    proxyUrl = url
      .replace(API_HOST, replacement)
      .replace(API_HOST_BACKUP, replacement)
      .replace(API_P1, replacement + '/p1')
    proxyType = 'api'
  }

  // 4. Worker/Host 代理分支 (确保包含所有需要被 Worker 托管的域名)
  else if (workerProxy && (isHost || isApi || isNextApi)) {
    // 直连模式
    if (workerProxyDirect) {
      proxyUrl = url.replace(HOST, workerProxy)

      // 仅替换 host, 修正 Host header 为目标域名, 若不一致可能会被 CDN 直接拒绝
      const match = proxyUrl.match(/^https?:\/\/([^/]+)/)
      if (match) newHeaders.Host = match[1]
      proxyType = 'host'
    }

    // Worker 模式
    else {
      proxyUrl = url
        .replace(API_HOST, workerProxy)
        .replace(API_HOST_BACKUP, workerProxy)
        .replace(API_P1, workerProxy)
        .replace(HOST, workerProxy)

      // Worker 模式: 添加 x-upstream 等 header
      newHeaders['x-upstream'] = isHtml ? 'bgm.tv' : isNextApi ? 'next.bgm.tv' : 'api.bgm.tv'
      if (workerSecret) newHeaders['x-proxy-key'] = workerSecret

      // 转发特定 header 到 worker
      for (const [from, to] of Object.entries(FORWARD_HEADERS)) {
        if (newHeaders[from]) {
          newHeaders[to] = newHeaders[from]
          delete newHeaders[from]
        }
      }

      // 删除 hop-by-hop header
      for (const key of HOP_HEADERS) delete newHeaders[key]

      proxyType = 'worker'
    }
  }

  // 5. 纯 Web 代理分支
  else if (isHtml && WEB && HOST_PROXY && isHost) {
    proxyUrl = url.replace(HOST, HOST_PROXY)
    proxyType = 'web_proxy'
  }

  // 6. 记录代理替换日志
  if (proxyType && proxyUrl !== url) {
    const logType = proxyType === 'api' ? 'api' : 'host'
    addWorkerLog('info', proxyUrl, logType)
  }

  return { url: proxyUrl, headers: newHeaders, proxyType }
}

/** 调试打印 */
export function logProxy(
  method: string,
  proxyType: '' | 'ech' | 'worker' | 'api' | 'host' | 'web_proxy',
  _url: string,
  finalUrl: string
) {
  if (proxyType) logger.log(`@utils/proxy/${method} (${proxyType})`, finalUrl)
}

/** 对 axios config 应用 proxy 转换 */
export function applyProxyToAxiosConfig(
  config: { url: string; headers?: Record<string, string>; [key: string]: any },
  isHtml = false
): void {
  const { workerProxy } = syncSystemStore().setting
  if (!workerProxy) return

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
  if (syncSystemStore().setting.workerProxy) applyProxyToAxiosConfig(config, isHtml)
  return axiosFn(config)
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
    return JSON.parse(data)?.location || ''
  } catch {
    return ''
  }
}

/** 带 proxy 的 authorize 重定向请求，自动提取重定向 URL */
export async function axiosWithProxyRedirect(
  axiosFn: (config: any) => Promise<any>,
  config: { url: string; headers?: Record<string, string>; [key: string]: any },
  isHtml = false
): Promise<{ response: any; redirectUrl: string }> {
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

  try {
    const response = await axiosFn(safeConfig)
    const redirectUrl =
      getRedirectFromBody(response?.data) ||
      getRedirectFromHeaders(response?.headers) ||
      response?.request?.responseURL ||
      ''

    if (redirectUrl) {
      addWorkerLog('success', `${reqHost} → 重定向`, 'host')
    }

    return { response, redirectUrl }
  } catch (error: any) {
    addWorkerLog('error', `${reqHost} 请求失败: ${error?.message || '未知错误'}`, 'host')
    const errResp = error?.response
    const fallbackUrl = getRedirectFromHeaders(errResp?.headers)
    if (fallbackUrl) return { response: errResp, redirectUrl: fallbackUrl }
    throw error
  }
}

/** 若配置了 workerLainProxy, 将 lain.bgm.tv 图片域名替换为代理地址, 附加 HMAC 签名 */
export function applyLainProxy(url: string) {
  const { workerProxyDisabled, workerLainProxy, workerLainSecret, workerApiProxy } =
    syncSystemStore().setting

  // DoH DNS (BangumiOkHttpClientFactory) 已注入 OkHttpClient 单例,
  // FastImage/Glide 共享同一实例, 图片域名自动走 DoH 解析, 无需改写 URL
  if (isEchProxyRunning()) return url

  // 全局禁用代理时直接返回原始 URL
  if (workerProxyDisabled) return url

  // api.bgm.tv 的 redirect 图片 (如 avatar) 走 API proxy
  if (
    typeof url === 'string' &&
    workerApiProxy &&
    (url.includes(API_HOST) || url.includes(API_HOST_BACKUP))
  ) {
    return url
      .replace(API_HOST, workerApiProxy.replace(/\/$/, ''))
      .replace(API_HOST_BACKUP, workerApiProxy.replace(/\/$/, ''))
  }

  if (!workerLainProxy || typeof url !== 'string' || !url.includes(HOST_IMAGE)) return url

  const proxyUrl = url.split(HOST_IMAGE).join(workerLainProxy.replace(/^https?:/, ''))

  // 记录图片代理日志
  addWorkerLog('info', proxyUrl, 'lain')

  if (!workerLainSecret) return proxyUrl

  // 提取 pathname 用于签名 (不含 query string)
  const pathStart = proxyUrl.indexOf('/', proxyUrl.indexOf('//') + 2)
  const pathname = (pathStart !== -1 ? proxyUrl.slice(pathStart) : '/').split('?')[0]

  // 计算 HMAC-SHA256(secret, pathname), 带缓存
  if (!signCache[pathname]) {
    signCache[pathname] = hmacSHA256(pathname, workerLainSecret).slice(0, 4)
  }

  return `${proxyUrl}${proxyUrl.includes('?') ? '&' : '?'}v=${signCache[pathname]}`
}
