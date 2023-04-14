/*
 * 使用 new XMLHttpRequest 的请求
 * @Author: czy0729
 * @Date: 2022-08-06 12:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 23:08:18
 */
import { STORYBOOK } from '@constants/device'
import { HOST, HOST_CDN, HOST_NAME, IOS } from '@constants/constants'
import { Fn } from '@types'
import { urlStringify } from '../utils'
import { syncUserStore } from '../async'
import { loading } from '../ui'
import { log } from '../dev'
import { SHOW_LOG } from './ds'
import { XHRArgs, XHRCustomArgs } from './types'
import { HOST_PROXY } from '@/config'

/** @deprecated 带登录信息的 XMLHttpRequest */
export function xhr(
  args: XHRArgs,
  success: (responseText?: string, request?: any) => any = () => {},
  fail: Fn = () => {}
) {
  const { method = 'POST', url, data = {}, noConsole } = args || {}
  const userStore = syncUserStore()
  const { cookie: userCookie, userAgent } = userStore.userCookie
  const hide = noConsole ? 0 : loading()
  const request = new XMLHttpRequest()
  request.onreadystatechange = () => {
    if (request.readyState !== 4) return
    if (hide) hide()
    if (request.status === 200) {
      success(request.responseText, request)
    } else {
      console.warn('[utils/fetch] xhr', url, request)
      fail(request)
    }
  }

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
export function xhrCustom(args: XHRCustomArgs): Promise<{
  _response: string
}> {
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
  if (STORYBOOK && HOST_PROXY) _url = _url.replace(HOST, HOST_PROXY)

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200 || this.status === 201) {
          // @ts-expect-error
          return resolve(this)
        }
        if (this.status === 404) reject(new TypeError('404'))
        if (this.status === 500) reject(new TypeError('500'))
        console.error('[utils/fetch] xhrCustom', url)
      }
    }
    request.onerror = function () {
      reject(new TypeError('xhrCustom onError'))
    }
    request.ontimeout = function () {
      reject(new TypeError('xhrCustom onTimeout'))
    }
    request.onabort = function () {
      reject(new TypeError('xhrCustom onAbort'))
    }

    request.open(method, _url, true)
    request.withCredentials = withCredentials
    if (responseType) request.responseType = responseType

    const _headers = headers
    if (url.includes(HOST_CDN) && !_headers.Referer) _headers.Referer = HOST

    Object.keys(_headers).forEach(key => {
      request.setRequestHeader(key, headers[key])
    })

    const body = data ? urlStringify(data) : null
    request.send(body)

    if (SHOW_LOG && showLog) log(`🔍 ${url}`)
  })
}

/** 请求收到返回数据马上结束 */
export function ping(url: string, headers = {}): Promise<number> {
  return new Promise(resolve => {
    const start = new Date().getTime()
    const xhr = new XMLHttpRequest()
    const cb = function (res) {
      // 有数据就马上返回
      if (res?._response.length > 10) {
        resolve(new Date().getTime() - start)
        return xhr.abort()
      }

      if (
        res?.readyState === 4 &&
        res?.responseHeaders?.[IOS ? 'Content-Length' : 'content-length']
      ) {
        resolve(new Date().getTime() - start)
        return xhr.abort()
      }
    }

    xhr.onreadystatechange = function () {
      return cb(this)
    }
    xhr.onerror = () => resolve(0)
    xhr.ontimeout = () => resolve(0)

    xhr.open('GET', url, true)
    xhr.withCredentials = false
    Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
    xhr.send()

    setTimeout(() => {
      resolve(0)
      return xhr.abort()
    }, 3000)
  })
}
