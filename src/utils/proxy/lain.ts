/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 09:07:48
 */
import { API_HOST, API_HOST_BACKUP } from '@constants/api'
import { HOST_IMAGE } from '@constants/host'
import { hmacSHA256 } from '../thirdParty/crypto'
import { normalizeLainImageUrl } from './normalize'
import { getApiProxyTarget, getProxyStrategy } from './strategy'
import { addWorkerLog } from './worker-log'

/** 签名缓存 (key 含密钥维度, 换密钥后旧签名立即失效) */
const signCache = new Map<string, string>()

/** 签名缓存上限, 超出后淘汰最早条目 */
const SIGN_CACHE_LIMIT = 1000

/** HMAC-SHA256(secret, pathname) 前 4 位 hex, 带缓存 */
function getSign(pathname: string, secret: string) {
  const cacheKey = `${secret}|${pathname}`
  const cached = signCache.get(cacheKey)
  if (cached) return cached

  const sign = hmacSHA256(pathname, secret).slice(0, 4)
  signCache.set(cacheKey, sign)

  if (signCache.size > SIGN_CACHE_LIMIT) {
    const oldest = signCache.keys().next().value as string | undefined
    if (oldest) signCache.delete(oldest)
  }

  return sign
}

/** 将 lain.bgm.tv 图片域名替换为代理地址, 附加 HMAC 签名 */
export function applyLainProxy(url: string) {
  const { disabled, ech, supporter, host, apiHost, lainHost, lainSecret } = getProxyStrategy()

  // 历史存量数据归一化: 把旧代理域名下的 lain 图片还原为官方 //lain.bgm.tv, 再按当前生效节点改写
  // 必须早于 disabled / ech 判定: 直连与 ECH 同样解析不了早已失效的旧代理域名
  const normalizedUrl = normalizeLainImageUrl(url)

  // DoH DNS (BangumiOkHttpClientFactory) 已注入 OkHttpClient 单例,
  // FastImage/Glide 共享同一实例, 图片域名自动走 DoH 解析, 无需改写 URL
  if (ech) return normalizedUrl

  // 全局禁用代理时直接返回原始 URL
  if (disabled) return normalizedUrl

  // 无效入参直接返回 (调用链存在 bg/avatar 全空的取值路径)
  if (!normalizedUrl) return normalizedUrl

  // api.bgm.tv 的 redirect 图片 (如 avatar): 支持者节点由内置主节点一并接管
  // 历史兼容分支: 官方 API 现在已直接返回 lain.bgm.tv 地址, 此处仅兜底老缓存/老接口数据
  const apiProxy = getApiProxyTarget({ supporter, host, apiHost })
  if (apiProxy && (normalizedUrl.includes(API_HOST) || normalizedUrl.includes(API_HOST_BACKUP))) {
    const replacement = apiProxy.replace(/\/$/, '')
    return normalizedUrl.replace(API_HOST, replacement).replace(API_HOST_BACKUP, replacement)
  }

  if (!lainHost || !normalizedUrl.includes(HOST_IMAGE)) return normalizedUrl

  const proxyUrl = normalizedUrl.split(HOST_IMAGE).join(lainHost.replace(/^https?:/, ''))

  // 记录图片代理日志
  addWorkerLog('info', proxyUrl, 'lain')

  if (!lainSecret) return proxyUrl

  // 提取 pathname 用于签名 (不含 query string)
  const pathStart = proxyUrl.indexOf('/', proxyUrl.indexOf('//') + 2)
  const pathname = (pathStart !== -1 ? proxyUrl.slice(pathStart) : '/').split('?')[0]

  return `${proxyUrl}${proxyUrl.includes('?') ? '&' : '?'}v=${getSign(pathname, lainSecret)}`
}
