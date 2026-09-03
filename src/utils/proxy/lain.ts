/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:30:41
 */
import { API_HOST, API_HOST_BACKUP } from '@constants/api'
import { HOST_IMAGE } from '@constants/host'
import { syncSystemStore } from '../async'
import { hmacSHA256 } from '../crypto'
import { isEchProxyRunning } from './ech'
import { addWorkerLog } from './worker-log'

/** HMAC 签名缓存, 避免重复计算 */
const signCache: Record<string, string> = {}

/** 若配置了 workerLainProxy, 将 lain.bgm.tv 图片域名替换为代理地址, 附加 HMAC 签名 */
export function applyLainProxy(url: string) {
  const { workerProxyDisabled, workerLainProxy, workerLainSecret, workerApiProxy } =
    syncSystemStore().setting

  // DoH DNS (BangumiOkHttpClientFactory) 已注入 OkHttpClient 单例,
  // FastImage/Glide 共享同一实例, 图片域名自动走 DoH 解析, 无需改写 URL
  if (isEchProxyRunning()) return url

  // 全局禁用代理时直接返回原始 URL
  if (workerProxyDisabled) return url

  // 无效入参直接返回 (调用链存在 bg/avatar 全空的取值路径)
  if (!url) return url

  // api.bgm.tv 的 redirect 图片 (如 avatar) 走 API proxy
  if (workerApiProxy && (url.includes(API_HOST) || url.includes(API_HOST_BACKUP))) {
    return url
      .replace(API_HOST, workerApiProxy.replace(/\/$/, ''))
      .replace(API_HOST_BACKUP, workerApiProxy.replace(/\/$/, ''))
  }

  if (!workerLainProxy || !url.includes(HOST_IMAGE)) return url

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
