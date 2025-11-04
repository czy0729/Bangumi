/*
 * 使用 new XMLHttpRequest 的请求
 * @Author: czy0729
 * @Date: 2022-08-06 12:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-03 15:01:46
 */
import { HOST, HOST_CDN, HOST_NAME, IOS } from '@constants/constants'
import { WEB } from '@constants/device'
import { FROZEN_FN } from '@constants/init'
import { HOST_PROXY } from '@src/config'
import { syncUserStore } from '../async'
import { isDevtoolsOpen } from '../dom'
import { loading } from '../ui'
import { urlStringify } from '../utils'
import { log } from './utils'

import type { Fn } from '@types'
import type { XHRArgs, XHRCustomArgs } from './types'

/** 带登录信息的 XMLHttpRequest */
export function xhr(
  args: XHRArgs,
  success: (responseText?: string, request?: XMLHttpRequest) => any = FROZEN_FN,
  fail: Fn = FROZEN_FN
) {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  const { method = 'POST', url, data = {}, noConsole } = args || {}
  const userStore = syncUserStore()
  const { cookie: userCookie, userAgent } = userStore.userCookie
  const hide = noConsole ? 0 : loading()
  const request = new XMLHttpRequest()

  request.onreadystatechange = function () {
    if (this.readyState !== 4) return
    if (hide) hide()
    if (this.status === 200) {
      success(this.responseText, this)
    } else {
      fail(this)
      log('xhr', 'fail:', url, this)
    }
  }.bind(request)

  request.open(method, url)
  request.withCredentials = false
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  request.setRequestHeader('Cookie', userCookie)
  request.setRequestHeader('User-Agent', userAgent)
  request.setRequestHeader('Host', HOST_NAME)
  request.setRequestHeader('accept-encoding', 'gzip, deflate')

  request.send(urlStringify(data))
}

/** 自定义 XHR */
export function xhrCustom(args: XHRCustomArgs): Promise<{ _response: string }> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  const {
    method = 'GET',
    url,
    data,
    headers = {},
    responseType,
    withCredentials = false,
    showLog = true
  } = args || {}

  let _url = url
  if (WEB && HOST_PROXY) _url = _url.replace(HOST, HOST_PROXY)

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200 || this.status === 201) {
          if (WEB) {
            return resolve({
              ...this,
              _response: this._response || this.responseText
            })
          }

          return resolve(this)
        }

        log('xhrCustom', 'error:', this.status, url, this._response || this.responseText)

        if (this.status === 404) reject(new TypeError('404'))
        if (this.status === 500) reject(new TypeError('500'))
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

    request.open(method, _url, true)
    request.withCredentials = withCredentials
    if (responseType) request.responseType = responseType

    const _headers = headers
    if (url.includes(HOST_CDN) && !_headers.Referer) _headers.Referer = HOST

    Object.keys(_headers).forEach(key => {
      request.setRequestHeader(key, headers[key])
    })

    const body = data
      ? typeof data === 'string'
        ? JSON.stringify(data)
        : urlStringify(data)
      : null
    request.send(body)

    if (showLog) log('xhrCustom', url)
  })
}

/** 请求收到返回数据马上结束 */
export function ping(url: string, headers = {}): Promise<number> {
  return new Promise(resolve => {
    const start = Date.now()
    const xhr = new XMLHttpRequest()

    const cb = function (res: XMLHttpRequest) {
      // 有数据就马上返回
      // @ts-expect-error _response 在 RN 下存在
      if (res?._response?.length > 10) {
        resolve(Date.now() - start)
        return xhr.abort()
      }

      const length =
        // @ts-expect-error responseHeaders 在 RN 下存在
        res?.responseHeaders?.[IOS ? 'Content-Length' : 'content-length']
      if (res?.readyState === 4 && length) {
        resolve(Date.now() - start)
        return xhr.abort()
      }
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
