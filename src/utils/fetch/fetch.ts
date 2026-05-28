/*
 * 使用 RN.fetch 的请求 (待废弃, 尽量少用)
 * @Author: czy0729
 * @Date: 2022-08-06 12:36:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-28 12:42:55
 */
import { API_HOST, API_V0 } from '@constants/api'
import { APP_ID, UA } from '@constants/constants'
import { WEB } from '@constants/device'
import { syncUserStore } from '../async'
import fetch from '../thirdParty/fetch-polyfill'
import { loading } from '../ui'
import { getTimestamp, sleep, urlStringify } from '../utils'
import {
  applyProxy,
  buildCookieHeaders,
  buildGetUrl,
  checkDenied,
  err,
  log,
  logProxy,
  safe,
  safeCookie
} from './utils'
import { FETCH_RETRY, FETCH_TIMEOUT, HEADERS_DEFAULT } from './ds'

import type { Body, Config, FetchAPIArgs, FetchHTMLArgs } from './types'

const retryCache: Record<string, number> = {}

/**
 * 统一请求方法
 *  - 若 GET 请求异常, 默认一段时间后重试 retryCb, 直到成功
 **/
export async function fetchAPI(args: FetchAPIArgs): Promise<any> {
  const { method = 'GET', url, data = {}, retryCb, noConsole = false } = args || {}
  const isGet = method === 'GET'

  checkDenied(url, isGet)

  const config: Config = {
    method: isGet ? 'GET' : 'POST',
    headers: {},
    timeout: FETCH_TIMEOUT
  }
  if (!WEB) config.headers['User-Agent'] = UA

  const { accessToken } = syncUserStore()
  if (accessToken.access_token) {
    if (WEB && url.includes(API_HOST) && !url.includes(API_V0)) {
      log('fetchAPI', 'fetchAPI ignored token:', url)
    } else {
      config.headers.Authorization = `${accessToken.token_type} ${accessToken.access_token}`
    }
  }

  const body: Body = { app_id: APP_ID, ...data }
  let requestUrl = url

  if (isGet) {
    body.state = getTimestamp()
    requestUrl = buildGetUrl(requestUrl, body)
  } else {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.body = urlStringify(body)
  }

  const proxyResult = applyProxy(requestUrl, config.headers)
  requestUrl = proxyResult.url
  config.headers = proxyResult.headers
  logProxy('fetchAPI', proxyResult.proxyType, url, requestUrl)

  const hideCb = !isGet && !noConsole ? loading() : undefined

  try {
    const response = await fetch(requestUrl, config)
    hideCb?.()

    // @ts-expect-error fetch polyfill 类型问题
    const json = await response.json()

    if (isGet) {
      const key = `${url}|${urlStringify(data)}`
      if (retryCache[key]) retryCache[key] = 0
    }

    if (json?.error) {
      if (json.error === 'invalid_token') syncUserStore().setOutdate()
      return { code: json.code, error: json.error, request: json.request }
    }

    return safe(json)
  } catch (error) {
    hideCb?.()

    if (isGet && typeof retryCb === 'function') {
      await sleep()
      const key = `${url}|${urlStringify(data)}`
      retryCache[key] = (retryCache[key] || 0) + 1
      if (retryCache[key] < FETCH_RETRY) return retryCb()
    }

    throw error
  }
}

const lastFetchHtml: Record<string, number> = {}

/**
 * 携带授权信息请求获取 html
 *  - 拦截瞬间多次完全同样的请求
 *  - args.url 开头带叹号!代表不携带授权信息
 */
export async function fetchHTML(args: FetchHTMLArgs): Promise<any> {
  const {
    method = 'GET',
    url,
    data = {},
    headers = {},
    cookie,
    raw = false,
    autoPrevent = true
  } = args || {}
  const isGet = method === 'GET'

  checkDenied(url, isGet)

  // 拦截瞬间多次完全同样的请求
  if (isGet) {
    const cacheKey = JSON.stringify({ url, data, headers, cookie })
    const ts = Date.now()

    if (lastFetchHtml[cacheKey]) {
      const distance = ts - lastFetchHtml[cacheKey]
      if (distance <= 4000 && autoPrevent) {
        throw new Error(`prevent, ${url}, ${distance}ms`)
      }
    }
    lastFetchHtml[cacheKey] = ts
  }

  const requestConfig: Config = {
    timeout: FETCH_TIMEOUT,
    headers: buildCookieHeaders(url, cookie, headers)
  }
  const body: Body = { ...data }
  let requestUrl = url.replace('!', '')

  if (requestConfig.headers.Cookie) {
    requestConfig.headers.Cookie = safeCookie(requestConfig.headers.Cookie)
  }

  if (isGet) {
    requestConfig.method = 'GET'
    requestConfig.headers = { ...HEADERS_DEFAULT, ...requestConfig.headers }
    if (Object.keys(body).length) {
      requestUrl = buildGetUrl(requestUrl, body)
    }
  } else {
    requestConfig.method = 'POST'
    requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    requestConfig.body = urlStringify(body)
  }

  // 处理 proxy 和反代
  const proxyResult = applyProxy(requestUrl, requestConfig.headers, true)
  requestUrl = proxyResult.url
  requestConfig.headers = proxyResult.headers
  logProxy('fetchHTML', proxyResult.proxyType, url, requestUrl)

  const hideCb = !isGet ? loading('Loading...', 8) : undefined

  try {
    const response = await fetch(requestUrl, requestConfig)
    if (!isGet) log('fetchHTML', method, 'success', requestUrl, requestConfig, response)

    // @ts-expect-error fetch polyfill 类型问题
    return raw ? response : await response.text()
  } catch (error) {
    err('fetchHTML', 'catch error:', url, error)
    throw error
  } finally {
    hideCb?.()
  }
}
