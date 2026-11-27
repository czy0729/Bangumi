/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 登录链路通用常量
 */
import type { CookieKey } from '../types'

/** 登录链路需要保留的 cookie key */
export const COOKIE_KEYS: CookieKey[] = [
  'chii_auth',
  'chii_cookietime',
  'chii_sec',
  'chii_sec_id',
  'chii_sid',
  'chii_theme'
]

/** 访问登录页时与真实浏览器保持一致的请求头 */
export const BROWSER_HEADERS = {
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  'Sec-Fetch-Site': 'same-origin',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1'
}

/** 直连响应可能把多条 Set-Cookie 折叠成一条，按 `, key=` 继续拆分 */
export const DIRECT_COOKIE_SEPARATOR = /,\s*(?=[A-Za-z_][\w-]*=)/

/** 直连请求默认超时，全局 axios 的 8s 对登录链路偏紧 */
export const DIRECT_TIMEOUT_MS = 20000

/** 进入页面时的登录态探测超时，避免代理异常时长时间挡住验证码 */
export const PROBE_TIMEOUT_MS = 6000
