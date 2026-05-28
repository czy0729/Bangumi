/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-29 06:58:32
 */
import pLimit from 'p-limit'
import { API_HOST, API_HOST_BACKUP, API_P1 } from '@constants/api'
import { HOST } from '@constants/constants'
import { WEB } from '@constants/device'
import {
  HOST_PROXY,
  USE_API_HOST_BACKUP,
  USE_WORKER_PROXY,
  WORKER_PROXY,
  WORKER_SECRET
} from '@src/config'
import { syncUserStore } from '../async'
import { logger } from '../dev'
import { isDevtoolsOpen } from '../dom'
import { urlStringify } from '../utils'

import type { Fn } from '@types'

/** 接口某些字段为空返回 null, 影响到 es6 函数初始值的正常使用, 统一处理成空字符串 */
export function safe(data: { [x: string]: any }) {
  if (data instanceof Object) Object.keys(data).forEach(k => (data[k] = safe(data[k])))
  return data === null ? '' : data
}

/** 修复 cookie 写法 */
export function safeCookie(cookie: string) {
  if (!cookie) return cookie

  return cookie
    .split(';')
    .map(item => item.trim())
    .filter(item => item !== 'undefined')
    .join('; ')
}

/**
 * 接口防并发请求问题严重, 暂时延迟一下, n 个请求一组
 * @param {*} fetchs fetchFn[]
 * @param {*} num default: 2
 */
export async function queue(fetchs: Fn[] = [], num: number = 2) {
  if (!fetchs.length) return false

  const limit = pLimit(num)
  return Promise.all(fetchs.map(fetch => limit(fetch)))
}

/** 检查请求是否被拒绝 */
export function checkDenied(_url: string, isGet: boolean): void {
  if (isDevtoolsOpen()) throw new Error('denied')
  if (WEB && !isGet && !USE_WORKER_PROXY) throw new Error('denied')
}

/** 处理 proxy 替换 */
export function applyProxy(
  url: string,
  headers: Record<string, string> = {},
  isHtml = false
): { url: string; headers: Record<string, string>; proxyType: '' | 'worker' | 'backup' } {
  const newHeaders = { ...headers }
  let proxyUrl = url
  let proxyType: '' | 'worker' | 'backup' = ''

  const isP1 = url.includes(API_P1)
  const isBgm = url.includes(API_HOST) || url.includes(HOST) || isP1

  if (USE_API_HOST_BACKUP && (url.includes(API_HOST) || isP1)) {
    proxyUrl = url.replace(API_HOST, API_HOST_BACKUP).replace(API_P1, API_HOST_BACKUP + '/p1')
    proxyType = 'backup'
  } else if (USE_WORKER_PROXY && isBgm) {
    proxyUrl = url
      .replace(API_HOST, WORKER_PROXY)
      .replace(HOST, WORKER_PROXY)
      .replace(API_P1, WORKER_PROXY)
    newHeaders['x-upstream'] = isHtml ? 'bgm.tv' : isP1 ? 'next.bgm.tv' : 'api.bgm.tv'
    if (WORKER_SECRET) newHeaders['x-proxy-key'] = WORKER_SECRET
    if (newHeaders.Cookie) {
      newHeaders['X-Cookie'] = newHeaders.Cookie
      delete newHeaders.Cookie
    }
    delete newHeaders.host
    delete newHeaders.Host
    delete newHeaders.origin
    delete newHeaders.Origin
    proxyType = 'worker'
  } else if (isHtml && WEB && HOST_PROXY && isBgm) {
    proxyUrl = url.replace(HOST, HOST_PROXY)
  }

  return { url: proxyUrl, headers: newHeaders, proxyType }
}

export function logProxy(method: string, proxyType: string, _url: string, finalUrl: string) {
  if (proxyType) log(method, `[${proxyType}]`, finalUrl)
}

/** 对 axios config 应用 proxy 转换 */
export function applyProxyToAxiosConfig(
  config: { url: string; headers?: Record<string, string>; [key: string]: any },
  isHtml = false
): void {
  if (!USE_WORKER_PROXY) return
  const result = applyProxy(config.url, config.headers || {}, isHtml)
  config.url = result.url
  config.headers = result.headers
}

/** 带 proxy 的 axios 普通请求 */
export async function axiosWithProxy<T = any>(
  axiosFn: (config: any) => Promise<T>,
  config: { url: string; headers?: Record<string, string>; [key: string]: any },
  isHtml = false
): Promise<T> {
  if (USE_WORKER_PROXY) applyProxyToAxiosConfig(config, isHtml)
  return axiosFn(config)
}

/** 带 proxy 的 authorize 重定向请求，自动提取重定向 URL */
export async function axiosWithProxyRedirect(
  axiosFn: (config: any) => Promise<any>,
  config: { url: string; headers?: Record<string, string>; [key: string]: any },
  isHtml = false
): Promise<{ response: any; redirectUrl: string }> {
  if (USE_WORKER_PROXY) {
    if (!config.headers) config.headers = {}
    config.headers['x-no-redirect'] = 'true'
    applyProxyToAxiosConfig(config, isHtml)
  }
  const response = await axiosFn(config)
  const redirectUrl =
    response.request?.responseURL || response.headers?.location || response.headers?.Location
  return { response, redirectUrl }
}

/** 构建 GET 请求 URL */
export function buildGetUrl(url: string, body: Record<string, any>): string {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${urlStringify(body)}`
}

/** 处理 cookie 中的 chii_cookietime */
export function normalizeCookieTime(cookie: string): string {
  if (!cookie) return cookie
  if (cookie.includes('chii_cookietime=0')) {
    return cookie.replace('chii_cookietime=0', 'chii_cookietime=2592000')
  }
  if (!cookie.includes('chii_cookietime=2592000')) {
    return `${cookie}; chii_cookietime=2592000;`
  }
  return cookie
}

/** 构建 cookie 请求头 */
export function buildCookieHeaders(
  url: string,
  cookie?: string,
  extraHeaders?: Record<string, string>
): Record<string, string> {
  if (url.startsWith('!')) return {}

  const { cookie: userCookie, setCookie, userAgent } = syncUserStore().userCookie
  const cookieValue = cookie
    ? `${userCookie} ${cookie} ${setCookie}`
    : `; ${userCookie}; ${setCookie}`

  return {
    'User-Agent': userAgent,
    Cookie: normalizeCookieTime(cookieValue),
    ...extraHeaders
  }
}

/** info */
export function log(method: string, ...others: any[]) {
  logger.log(`@utils/fetch/${method}`, ...others)
}

/** err */
export function err(method: string, ...others: any[]) {
  logger.error(`@utils/fetch/${method}`, ...others)
}
