/*
 * @Author: czy0729
 * @Date: 2026-09-16 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 10:00:00
 *
 * 代理地址纯字符串工具: 不依赖任何 store / 常量, 供 native-url 与 normalize 共用
 */

/** 取出地址里的域名 (不含 scheme / 端口 / 路径) */
export function getDomain(url: string): string {
  const host = String(url || '').match(/^(?:https?:)?\/\/([^/?#]+)/)?.[1] || ''

  return host.split(':')[0]
}

/** 取出地址里的 pathname (不含 query / hash), 无域名时按相对路径处理 */
export function getPathname(url: string): string {
  return String(url || '')
    .replace(/^(?:https?:)?\/\/[^/?#]*/, '')
    .split('?')[0]
    .split('#')[0]
}

/** 把开头的 scheme + 域名 + 可选端口整体替换为目标域 */
export function replaceDomain(url: string, domain: string, target: string): string {
  const escaped = domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const reg = new RegExp(`^(?:https?:)?\\/\\/${escaped}(?::\\d+)?(?=\\/|\\?|#|$)`, 'i')

  return url.replace(reg, target)
}

/** 移除节点专用的签名参数 */
export function removeSign(url: string): string {
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
