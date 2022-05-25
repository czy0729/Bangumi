/*
 * 请求相关
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 09:14:33
 */
import {
  APP_ID,
  APP_BAIDU_ID,
  APP_BAIDU_KEY,
  HOST,
  HOST_NAME,
  HOST_CDN,
  IOS,
  UA
} from '@constants'
import { Fn } from '@types'
import fetch from './thirdParty/fetch-polyfill'
import md5 from './thirdParty/md5'
import { urlStringify, sleep, getTimestamp } from './utils'
import { getUserStoreAsync } from './async'
import { info as UIInfo, loading } from './ui'
import { log } from './dev'
import { hm, ua, err, t } from './track'

export { hm, ua, err, t }

const SHOW_LOG = true // 开发显示请求信息
const FETCH_TIMEOUT = 6400 // api超时时间
const FETCH_RETRY = 4 // get请求失败自动重试次数
const HEADERS_DEFAULT = {
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  Connection: 'keep-alive',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Referer: HOST
}

type FetchAPIArgs = {
  method?: 'GET' | 'POST'
  url: string
  data?: {
    [key: string]: any
  }
  retryCb?: any
  info?: string
  noConsole?: boolean
}

const _retry = {}

/**
 * 统一请求方法
 * 若GET请求异常, 默认一段时间后重试retryCb, 直到成功
 * @param {*} param
 */
export default async function fetchAPI(
  {
    method = 'GET',
    url,
    data = {},
    retryCb,
    info = '',
    noConsole = false
  }: FetchAPIArgs = {} as FetchAPIArgs
) {
  const isGet = method === 'GET'
  const userStore = getUserStoreAsync()
  const { accessToken } = userStore
  const _config: any = {
    timeout: FETCH_TIMEOUT,
    headers: {
      Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
      'User-Agent': UA
    }
  }
  const body: {
    [key: string]: any
  } = {
    app_id: APP_ID,
    ...data
  }

  let _url = url
  let hide
  if (isGet) {
    _config.method = 'GET'

    // 随机数防止接口CDN缓存
    body.state = getTimestamp()
    _url += `${_url.includes('?') ? '&' : '?'}${urlStringify(body)}`
  } else {
    _config.method = 'POST'
    _config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    _config.body = urlStringify(body)

    if (!noConsole) hide = loading()
  }
  if (SHOW_LOG) log(`🌐 ${info} ${_url}`)

  return fetch(_url, _config)
    .then(response => {
      if (hide) hide()
      return response.json()
    })
    .then(json => {
      // 成功后清除失败计数
      if (isGet) {
        const key = `${url}|${urlStringify(data)}`
        if (_retry[key]) _retry[key] = 0
      }

      // @issue 由于Bangumi提供的API没有统一返回数据
      // 正常情况没有code, 错误情况例如空的时候, 返回 { code: 400, err: '...' }
      if (json && json.error) {
        if (json.error === 'invalid_token') {
          UIInfo('登录过期')
          userStore.logout()
        }
        return Promise.resolve({
          code: json.code,
          error: json.error,
          request: json.request
        })
      }

      // 接口某些字段为空返回null, 影响到解构的正常使用, 统一处理成空字符串
      return Promise.resolve(safe(json))
    })
    .catch(async err => {
      if (hide) hide()

      // @issue Bangumi提供的API频繁请求非常容易报错, 也就只能一直请求到成功为止了
      if (isGet && typeof retryCb === 'function') {
        await sleep()

        const key = `${url}|${urlStringify(data)}`
        _retry[key] = (_retry[key] || 0) + 1
        if (_retry[key] < FETCH_RETRY) {
          return retryCb()
        }
      }

      UIInfo(`${info}请求失败`)
      return Promise.reject(err)
    })
}

type FetchHTMLArgs = {
  method?: 'GET' | 'POST'
  url: string
  data?: {
    [key: string]: any
  }
  headers?: {
    [key: string]: any
  }
  cookie?: string
  raw?: boolean
}

const lastFetchHTML = {}

/**
 * 请求获取HTML
 *  - chii_cookietime=2592000
 *  - 2021/01/17 拦截瞬间多次完全同样的请求
 *
 * @param {*} param
 */
export async function fetchHTML(
  {
    method = 'GET',
    url,
    data = {},
    headers = {},
    cookie,
    raw = false
  }: FetchHTMLArgs = {} as FetchHTMLArgs
) {
  const isGet = method === 'GET'

  // 拦截瞬间多次完全同样的请求
  if (isGet) {
    const cacheKey = JSON.stringify({
      url,
      data,
      headers,
      cookie
    })
    const ts = new Date().valueOf()
    if (!lastFetchHTML[cacheKey]) {
      lastFetchHTML[cacheKey] = ts
    } else {
      const distance = ts - lastFetchHTML[cacheKey]
      if (distance <= 2000) {
        log(`[prevent] ⚡️ ${url} ${distance}ms`)
        return Promise.reject(new Error('prevent fetchHTML'))
      }

      lastFetchHTML[cacheKey] = ts
    }
  }

  const userStore = getUserStoreAsync()
  const { cookie: userCookie, setCookie, userAgent } = userStore.userCookie
  const _config: {
    method?: FetchHTMLArgs['method']
    timeout: typeof FETCH_TIMEOUT
    headers: {
      [key: string]: any
    }
    body?: string
  } = {
    timeout: FETCH_TIMEOUT,
    headers: {}
  }
  const body = {
    ...data
  }

  let _url = url.replace('!', '') // 叹号代表不携带cookie
  if (url.indexOf('!') !== 0) {
    _config.headers = {
      'User-Agent': userAgent,

      // @issue iOS不知道为什么会有文本乱插在cookie前面, 要加分号防止
      Cookie: cookie
        ? `${userCookie} ${cookie} ${setCookie}`
        : `; ${userCookie}; ${setCookie}`,
      ...headers
    }

    // @notice 遗留问题, 要把chii_cookietime=0 换成 chii_cookietime=2592000, 而且必带 chii_cookietime
    if (_config.headers.Cookie.includes('chii_cookietime=0')) {
      _config.headers.Cookie = _config.headers.Cookie.replace(
        'chii_cookietime=0',
        'chii_cookietime=2592000'
      )
    } else if (!_config.headers.Cookie.includes('chii_cookietime=2592000')) {
      _config.headers.Cookie = `${_config.headers.Cookie}; chii_cookietime=2592000;`
    }
  }

  let hide
  if (isGet) {
    _config.method = 'GET'
    _config.headers = {
      ...HEADERS_DEFAULT,
      ..._config.headers
    }
    if (Object.keys(body).length) {
      _url += `${_url.includes('?') ? '&' : '?'}${urlStringify(body)}`
    }
  } else {
    _config.method = 'POST'
    _config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    _config.body = urlStringify(body)
    hide = loading('Loading...', 8)
  }
  if (SHOW_LOG) log(`⚡️ ${_url}`)

  return fetch(_url, _config)
    .then(res => {
      if (!isGet) log(method, 'success', _url, _config, res)
      if (hide) hide()
      return Promise.resolve(raw ? res : res.text())
    })
    .catch(error => {
      console.warn('[utils/fetch] fetchHTML', url, error)
      if (hide) hide()
      return Promise.reject(error)
    })
}

type XHRArgs = {
  method: 'GET' | 'POST'
  url: string
  data?: {
    [key: string]: any
  }
  noConsole?: boolean
}

/**
 * [待废弃] 带登录信息的XMLHttpRequest
 *
 * @param {*} params
 * @param {*} success
 * @param {*} fail
 */
export function xhr(
  { method = 'POST', url, data = {}, noConsole }: XHRArgs = {} as XHRArgs,
  success: Fn = () => {},
  fail: Fn = () => {}
) {
  const userStore = getUserStoreAsync()
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

type XHRCustomArgs = {
  method?: 'GET' | 'POST' | 'PUT'
  url: string
  data?: object
  headers?: {
    [key: string]: string
  }
  responseType?: '' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text'
  withCredentials?: boolean
  showLog?: boolean
}

/**
 * 自定义XHR
 */
export function xhrCustom(
  {
    method = 'GET',
    url,
    data,
    headers = {},
    responseType,
    withCredentials = false,
    showLog = true
  }: XHRCustomArgs = {} as XHRCustomArgs
): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200 || this.status === 201) {
          resolve(this)
          return
        }

        if (this.status === 404) {
          reject(new TypeError('404'))
        } else if (this.status === 500) {
          reject(new TypeError('500'))
        }

        console.warn('[utils/fetch] xhrCustom', url)
      }
    }
    request.onerror = function () {
      reject(new TypeError('Network request onerror'))
    }
    request.ontimeout = function () {
      reject(new TypeError('Network request ontimeout'))
    }
    request.onabort = function () {
      reject(new TypeError('Network request onabort'))
    }

    request.open(method, url, true)
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

/**
 * 接口防并发请求问题严重, 暂时延迟一下, n个请求一组
 * @param {*} fetchs
 */
export async function queue(fetchs = [], num = 2) {
  if (!fetchs.length) return false

  await Promise.all(
    new Array(num).fill(0).map(async () => {
      while (fetchs.length) {
        await fetchs.shift()()
      }
    })
  )
  return true
}

/**
 * 百度翻译
 * @param {*} query
 * @param {*} to
 */
export async function baiduTranslate(query: string, to = 'zh') {
  try {
    const appid = APP_BAIDU_ID // 秘密
    const salt = new Date().getTime()
    const from = 'auto'
    const q = query.split('\r\n').join('\n')
    const sign = md5(`${appid}${q}${salt}${APP_BAIDU_KEY}`)
    const { _response } = await xhrCustom({
      url: `https://api.fanyi.baidu.com/api/trans/vip/translate?${urlStringify({
        q,
        appid,
        salt,
        from,
        to,
        sign
      })}`
    })
    return _response
  } catch (error) {
    // warn('utils/fetch.js', 'baiduTranslate', error)
    return false
  }
}

/**
 * 接口某些字段为空返回null, 影响到es6函数初始值的正常使用, 统一处理成空字符串
 * @param {*} data
 * @url https://jsperf.com/moved-null-2
 */
export function safe(data) {
  if (data instanceof Object) {
    Object.keys(data).forEach(k => (data[k] = safe(data[k])))
  }
  return data === null ? '' : data
}

/**
 * 请求后马上结束
 * @param url
 * @param headers
 */
export function ping(url, headers = {}) {
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
