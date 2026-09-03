/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:30:39
 */
import { API_HOST, API_HOST_BACKUP, API_P1 } from '@constants/api'
import { WEB } from '@constants/device'
import { HOST } from '@constants/host'
import { HOST_PROXY } from '@src/config'
import { syncSystemStore } from '../async'
import { isEchProxyRunning } from './ech'
import { addWorkerLog } from './worker-log'

import type { ProxyType } from './types'

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
  isHtml: boolean = false
): {
  url: string
  headers: Record<string, string>
  proxyType: ProxyType
} {
  const { workerProxyDisabled, workerProxy, workerSecret, workerProxyDirect, workerApiProxy } =
    syncSystemStore().setting

  // 0. 无效入参直接返回 (业务请求链路存在 url 为空的场景)
  if (!url) return { url, headers: { ...headers }, proxyType: '' }

  // 1. ECH 代理运行时, OkHttp 已走本地代理, 无需 URL 替换
  if (isEchProxyRunning()) return { url, headers: { ...headers }, proxyType: 'ech' }

  // 2. 全局禁用代理时直接返回原始值
  if (workerProxyDisabled) return { url, headers: { ...headers }, proxyType: '' }

  const newHeaders = { ...headers }
  let proxyUrl = url
  let proxyType: ProxyType = ''

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

      // 仅替换 host, Host header 需与代理域名一致, 否则可能被 CDN 直接拒绝
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
