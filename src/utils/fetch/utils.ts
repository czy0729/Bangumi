/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-30 06:41:02
 */
import pLimit from 'p-limit'
import { WEB } from '@constants/device'
import { USE_WORKER_PROXY } from '@src/config'
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
