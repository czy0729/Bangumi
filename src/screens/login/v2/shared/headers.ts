/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 登录请求头构造
 */

/** 组装请求时可能用到的头 */
export type HeaderSource = {
  userAgent: string
  cookie: string
  host: string
}

/**
 * 按需组装请求头
 *
 * @param source 当前登录状态
 * @param keys 需要的头, 缺省则全部不带
 */
export function buildHeaders(source: HeaderSource, keys: string[] = []): Record<string, string> {
  const headers: Record<string, string> = {}
  if (keys.includes('User-Agent')) headers['User-Agent'] = source.userAgent
  if (keys.includes('Cookie')) headers['Cookie'] = source.cookie
  if (keys.includes('Content-Type')) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  if (keys.includes('Referer')) headers['Referer'] = `${source.host}/login`

  return headers
}
