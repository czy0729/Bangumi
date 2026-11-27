/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * cookie 字符串与 Set-Cookie 合并 (纯函数, 不持有状态)
 */
import { COOKIE_KEYS, DIRECT_COOKIE_SEPARATOR } from './constants'

import type { Cookie, CookieKey } from '../types'

/**
 * 解析单条 cookie 的键值
 * - key 不会包含 `=`, 用第一个 `=` 切分才能保住带填充的值
 *
 * @param cookie Set-Cookie 片段
 */
function parseCookiePair(cookie: string): [string, string] {
  const [keyValue] = cookie.split(';')
  const index = keyValue.indexOf('=')
  if (index === -1) return [keyValue.trim(), '']

  return [keyValue.slice(0, index).trim(), keyValue.slice(index + 1).trim()]
}

/** 组装请求用的 Cookie 串 */
export function stringifyCookie(cookie: Cookie): string {
  return Object.entries(cookie)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')
}

/**
 * 合并 Set-Cookie, 只保留登录相关 key
 *
 * @param cookie 当前 cookie
 * @param setCookie Set-Cookie 原始串
 * @param direct 直连模式 (拆分规则不同)
 */
export function mergeSetCookie(cookie: Cookie, setCookie: string, direct: boolean): Cookie {
  if (!setCookie) return cookie

  const next: Cookie = { ...cookie }
  setCookie.split(direct ? DIRECT_COOKIE_SEPARATOR : /,\s*/).forEach(item => {
    const [key, value] = parseCookiePair(item)
    if (!COOKIE_KEYS.includes(key as CookieKey)) return

    if (value === 'delete' || value === 'deleted') {
      delete next[key as CookieKey]
    } else {
      next[key as CookieKey] = value
    }
  })

  return next
}
