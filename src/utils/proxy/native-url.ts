/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 23:14:10
 *
 * 还原为 bgm 原生地址: 命中内置节点域名时替换域名, 用于无法携带密钥的出口
 */
import { getSupporterConfig } from '@utils/kv/worker'
import { HOST, HOST_IMAGE } from '@constants/host'

/** 图片域 (补全协议) */
const HOST_IMAGE_URL = `https:${HOST_IMAGE}`

/** 取出地址里的域名 (不含 scheme / 端口 / 路径) */
function getDomain(url: string): string {
  const host = String(url || '').match(/^(?:https?:)?\/\/([^/?#]+)/)?.[1] || ''

  return host.split(':')[0]
}

/** 把开头的 scheme + 域名 + 可选端口整体替换为目标域 */
function replaceDomain(url: string, domain: string, target: string): string {
  const escaped = domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const reg = new RegExp(`^(?:https?:)?\\/\\/${escaped}(?::\\d+)?(?=\\/|\\?|#|$)`, 'i')

  return url.replace(reg, target)
}

/** 移除节点专用的签名参数 */
function removeSign(url: string): string {
  const hashIndex = url.indexOf('#')
  const hash = hashIndex === -1 ? '' : url.slice(hashIndex)
  const rest = hashIndex === -1 ? url : url.slice(0, hashIndex)

  const queryIndex = rest.indexOf('?')
  if (queryIndex === -1) return url

  const base = rest.slice(0, queryIndex)
  const kept = rest
    .slice(queryIndex + 1)
    .split('&')
    .filter(item => item && !/^v=/i.test(item))

  return kept.length ? `${base}?${kept.join('&')}${hash}` : `${base}${hash}`
}

/**
 * 还原为 bgm 原生地址 (命中内置节点域名时替换为 bgm.tv / lain.bgm.tv)
 * - 只与内置节点域名精确比对 (不区分大小写), 用户自填地址与社区反代原样返回
 * - 图片地址上的签名参数一并移除
 * - 空值 / 非字符串 / 无域名 / 配置为空时均原样返回, 不抛错
 */
export function restoreNativeUrl(url: string): string {
  if (typeof url !== 'string' || !url) return url

  const domain = getDomain(url)
  if (!domain) return url

  const { host, lainHost } = getSupporterConfig()
  const lower = domain.toLowerCase()

  const hostDomain = getDomain(host)
  if (hostDomain && lower === hostDomain.toLowerCase()) {
    return replaceDomain(url, domain, HOST)
  }

  const lainDomain = getDomain(lainHost)
  if (lainDomain && lower === lainDomain.toLowerCase()) {
    return removeSign(replaceDomain(url, domain, HOST_IMAGE_URL))
  }

  return url
}
