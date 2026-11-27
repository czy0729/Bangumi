/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 跳转相关解析: 登出地址归一化 / 响应里的 location 提取
 */
import { getRedirectFromBody, getRedirectFromHeaders } from '@utils/proxy'

/**
 * 从页面 HTML 里提取登出地址, 统一成绝对地址
 *
 * @param host 当前域名
 * @param html 页面内容
 */
export function resolveLogoutUrl(host: string, html: string): string {
  const match = html.match(/href="([^"]*\/logout\/[^"]*)"/)
  if (!match) return ''

  const href = match[1]
  if (/^https?:\/\//i.test(href)) return href
  if (href.startsWith('//')) return `https:${href}`

  return `${host}${href.startsWith('/') ? '' : '/'}${href}`
}

/**
 * 从响应里取跳转地址
 * - 只认 JSON 响应体里的 location (节点/原生合成), HTML 页面脚本不算
 * - 其次读 Location / x-redirect-url 响应头
 *
 * @param data 响应体
 * @param headers 响应头
 */
export function readRedirectTarget(data: unknown, headers?: Record<string, string>): string {
  const bodyRedirect =
    typeof data === 'string'
      ? data.trim().startsWith('{')
        ? getRedirectFromBody(data)
        : ''
      : data === undefined
      ? ''
      : getRedirectFromBody(JSON.stringify(data))

  return bodyRedirect || getRedirectFromHeaders(headers)
}
