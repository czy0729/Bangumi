/*
 * @Author: czy0729
 * @Date: 2026-05-30 06:28:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 23:16:34
 */
export { applyProxy } from './apply'
export { applyProxyToAxiosConfig, axiosWithProxy, axiosWithProxyRedirect } from './axios'
export { getProxyImageHeaders } from './image-headers'
export { applyLainProxy } from './lain'
export { logProxy } from './log'
export { restoreNativeUrl } from './native-url'
export { isTrustedImageDomain, normalizeLainImageUrl } from './normalize'
export {
  getRedirectFromBody,
  getRedirectFromHeaders,
  getRedirectFromXhr,
  parseOAuthCode
} from './redirect'
export { normalizeSetCookie, parseSetCookieHeader, parseSetCookieItems } from './set-cookie'
export { getProxyStrategy } from './strategy'

export type { ProxyType, ProxyRequestConfig, ProxyAxiosResponse, ProxyAxiosFn } from './types'
