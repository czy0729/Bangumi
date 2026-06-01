/*
 * 使用 new XMLHttpRequest 的请求
 * @Author: czy0729
 * @Date: 2022-08-06 12:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 00:46:17
 */
import { applyProxy, logProxy } from '@utils/proxy'
import { HOST, HOST_CDN, HOST_NAME } from '@constants/constants'
import { WEB } from '@constants/device'
import { FROZEN_FN } from '@constants/init'
import { syncUserStore } from '../async'
import { loading } from '../ui'
import { urlStringify } from '../utils'
import { checkDenied, log } from './utils'

import type { Fn } from '@types'
import type { XHRArgs, XHRCustomArgs } from './types'

/** 带登录信息的 XMLHttpRequest */
export function xhr(
  args: XHRArgs,
  success: (responseText?: string, request?: XMLHttpRequest) => any = FROZEN_FN,
  fail: Fn = FROZEN_FN
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
      log('xhr', 'fail:', requestUrl, this)
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

      log('xhrCustom', 'error:', this.status, requestUrl, this._response || this.responseText)
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

    if (showLog) log('xhrCustom', requestUrl)
  })
}

/** 请求收到返回数据马上结束 */
export function ping(url: string, headers = {}): Promise<number> {
  return new Promise(resolve => {
    const start = Date.now()
    const xhr = new XMLHttpRequest()

    const cb = function (res: XMLHttpRequest) {
      // 只在请求完成时检查
      if (res.readyState !== 4) return

      // 必须是 200 状态码才算成功
      if (res.status !== 200) {
        resolve(0)
        return xhr.abort()
      }

      // 200 即视为成功，直接返回延迟
      resolve(Date.now() - start)
      return xhr.abort()
    }

    xhr.onreadystatechange = function () {
      cb(this)
    }.bind(xhr)

    xhr.onerror = () => resolve(0)
    xhr.ontimeout = () => resolve(0)

    xhr.open('GET', url, true)
    xhr.withCredentials = false

    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })

    xhr.send()

    setTimeout(() => {
      resolve(0)
      xhr.abort()
    }, 3000)
  })
}
