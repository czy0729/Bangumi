/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 06:18:03
 *
 * 使用 new XMLHttpRequest 的请求
 */
import { applyProxy, logProxy } from '@utils/proxy'
import { WEB } from '@constants/device'
import { HOST, HOST_CDN, HOST_NAME } from '@constants/host'
import { FROZEN_FN } from '@constants/init'
import { syncUserStore } from '../async'
import { loading } from '../ui'
import { urlStringify } from '../utils'
import { checkDenied, err, log } from './utils'

import type { XHRArgs, XHRCustomArgs } from './types'

/** 带登录信息的 XMLHttpRequest */
export function xhr(
  args: XHRArgs,
  success: (responseText?: string, request?: XMLHttpRequest) => any = FROZEN_FN,
  fail: (request: XMLHttpRequest) => void = FROZEN_FN
) {
  const { method = 'POST', url, data = {}, noConsole } = args || {}
  checkDenied(url, false)

  const userStore = syncUserStore()
  const { cookie: userCookie, userAgent } = userStore.userCookie

  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Cookie: userCookie,
    'User-Agent': userAgent,
    Host: HOST_NAME,
    'accept-encoding': 'gzip, deflate'
  }
  const isHtml = url.includes(HOST) && !url.includes('api.')
  const proxyResult = applyProxy(url, headers, isHtml)
  const requestUrl = proxyResult.url
  const requestHeaders = proxyResult.headers
  logProxy('xhr', proxyResult.proxyType, url, requestUrl)

  const hide = noConsole ? 0 : loading()
  const request = new XMLHttpRequest()

  request.onreadystatechange = function () {
    if (this.readyState !== 4) return
    if (hide) hide()
    if (this.status === 200) {
      success(this.responseText, this)
    } else {
      fail(this)
      err('xhr', 'fail:', { requestUrl })
    }
  }.bind(request)

  request.open(method, requestUrl)
  request.withCredentials = false

  Object.keys(requestHeaders).forEach(key => {
    request.setRequestHeader(key, requestHeaders[key])
  })

  request.send(urlStringify(data))
}

/** 自定义 XHR */
export function xhrCustom(args: XHRCustomArgs): Promise<{ _response: string }> {
  const {
    method = 'GET',
    url,
    data,
    headers = {},
    responseType,
    withCredentials = false,
    showLog = true
  } = args || {}

  checkDenied(url, true)

  const isHtml = url.includes(HOST) && !url.includes('api.')
  const proxyResult = applyProxy(url, headers, isHtml)
  const requestUrl = proxyResult.url
  const requestHeaders = proxyResult.headers
  logProxy('xhrCustom', proxyResult.proxyType, url, requestUrl)

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.onreadystatechange = function () {
      if (this.readyState !== 4) return

      if (this.status === 200 || this.status === 201) {
        resolve(WEB ? { ...this, _response: this._response || this.responseText } : this)
        return
      }

      err('xhrCustom', 'error:', {
        status: this.status,
        requestUrl,
        responseText: this._response || this.responseText
      })
      if (this.status === 404 || this.status === 500) {
        reject(new TypeError(String(this.status)))
      }
    }.bind(request)

    request.onerror = function () {
      reject(new TypeError('xhrCustom onError'))
    }.bind(request)

    request.ontimeout = function () {
      reject(new TypeError('xhrCustom onTimeout'))
    }.bind(request)

    request.onabort = function () {
      reject(new TypeError('xhrCustom onAbort'))
    }.bind(request)

    request.open(method, requestUrl, true)
    request.withCredentials = withCredentials
    if (responseType) request.responseType = responseType

    if (url.includes(HOST_CDN) && !requestHeaders.Referer) requestHeaders.Referer = HOST

    Object.keys(requestHeaders).forEach(key => {
      request.setRequestHeader(key, requestHeaders[key])
    })

    const body = data
      ? typeof data === 'string'
        ? JSON.stringify(data)
        : urlStringify(data)
      : null
    request.send(body)

    if (showLog) log('xhrCustom', { requestUrl })
  })
}

/** 带超时兜底的请求默认超时 (毫秒) */
const XHR_TIMEOUT = 8000

/**
 * 带超时兜底的请求: xhrCustom 对 403 等状态码会永久挂起, 超时与失败同义 (不要改成重试)
 * */
export function xhrTimeout(
  url: string,
  timeout: number = XHR_TIMEOUT,
  headers?: Record<string, string>
) {
  let timer: ReturnType<typeof setTimeout> | undefined

  return Promise.race([
    xhrCustom({ url, headers }),
    new Promise<never>((_resolve, reject) => {
      timer = setTimeout(() => reject(new Error('xhr timeout')), timeout)
    })
  ]).finally(() => clearTimeout(timer))
}

/**
 * 延迟探测, 失败与超时返回 0
 *
 * @param url 请求地址
 * @param headers 额外请求头
 * @param timeout 超时 (毫秒)
 * @param until 结算时机: headers 收到响应头即结束, complete 等响应体下载完
 */
export function ping(
  url: string,
  headers: Record<string, string> = {},
  timeout: number = 3000,
  until: 'headers' | 'complete' = 'complete'
): Promise<number> {
  return new Promise(resolve => {
    const start = Date.now()
    const xhr = new XMLHttpRequest()
    let settled = false

    /** HEADERS_RECEIVED 与 DONE, 用 >= 兼容跳过中间状态的实现 */
    const targetReadyState = until === 'headers' ? 2 : 4

    const finish = (latency: number) => {
      if (settled) return

      settled = true
      resolve(latency)
      xhr.abort()
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState < targetReadyState) return

      finish(xhr.status === 200 ? Date.now() - start : 0)
    }

    xhr.onerror = () => finish(0)
    xhr.ontimeout = () => finish(0)

    try {
      xhr.open('GET', url, true)
      xhr.timeout = timeout
      xhr.withCredentials = false

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.send()
    } catch {
      /** 非法地址等同步异常按失败处理, 不向调用方抛 */
      finish(0)
    }
  })
}
