/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 *
 * 重定向地址与 oauth code 提取
 * - 直连 / ECH / 普通反代: 跳转后的最终地址 (responseURL) 或 Location
 * - Worker / 支持者节点 (x-no-redirect): 节点以 200 返回 JSON { location } 与 x-redirect-url
 */

/**
 * 从重定向地址中提取 oauth code
 * - 兼容 ?code= / &code= / #code=
 * - 兼容 URL 编码 (%2B 等)
 * - 无 code 返回空字符串
 */
export function parseOAuthCode(url?: string): string {
  if (!url || typeof url !== 'string') return ''

  const match = url.match(/[?&#]code=([^&#\s]+)/)
  if (!match) return ''

  try {
    return decodeURIComponent(match[1])
  } catch {
    return match[1]
  }
}

/** 从响应头中提取重定向 URL */
export function getRedirectFromHeaders(headers?: Record<string, unknown>): string {
  if (!headers) return ''

  const value =
    headers['x-redirect-url'] ??
    headers['X-Redirect-Url'] ??
    headers['location'] ??
    headers['Location']

  return typeof value === 'string' ? value : ''
}

/** 从响应体中提取重定向 URL (节点 JSON `{ location }` / 页面内跳转脚本) */
export function getRedirectFromBody(data?: unknown): string {
  if (typeof data !== 'string' || !data) return ''

  if (data.includes('location')) {
    try {
      const parsed = JSON.parse(data) as { location?: unknown } | null
      if (typeof parsed?.location === 'string') return parsed.location
    } catch {}

    // 页面内跳转脚本兜底: location = "https://..." / location.href = 'https://...'
    const match = data.match(/location(?:\.href)?\s*[:=]\s*["']([^"']+)["']/)
    if (match) return match[1]
  }

  return ''
}

/** 从 XHR 对象提取重定向 URL (兼容原生 XHR / WEB, 顺序: 响应头 → 响应体 → 最终地址) */
export function getRedirectFromXhr(xhr?: {
  responseURL?: string
  getResponseHeader?: (name: string) => string | null
  _response?: string
}): string {
  if (!xhr) return ''

  try {
    const byHeader =
      xhr.getResponseHeader?.('x-redirect-url') || xhr.getResponseHeader?.('location')
    if (byHeader) return byHeader
  } catch {}

  const byBody = getRedirectFromBody(xhr._response)
  if (byBody) return byBody

  return xhr.responseURL || ''
}
