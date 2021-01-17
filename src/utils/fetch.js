/* eslint-disable space-before-function-paren, func-names */
/*
 * 请求相关
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 14:42:55
 */
import { NativeModules, InteractionManager } from 'react-native'
import { Portal } from '@ant-design/react-native'
import Toast from '@components/@/ant-design/toast'
import {
  APP_ID,
  APP_ID_BAIDU,
  DEV,
  HOST,
  HOST_NAME,
  IOS,
  VERSION_GITHUB_RELEASE
} from '@constants'
import { HOST_CDN } from '@constants/cdn'
import events from '@constants/events'
import { BAIDU_KEY } from '@constants/secret'
import fetch from './thirdParty/fetch-polyfill'
import md5 from './thirdParty/md5'
import { urlStringify, sleep, getTimestamp, randomn, debounce } from './index'
import { getUserStoreAsync, getThemeStoreAsync } from './async'
import { info as UIInfo } from './ui'
import { log } from './dev'

const { UMAnalyticsModule } = NativeModules
const SHOW_LOG = true // 开发显示请求信息
const FETCH_TIMEOUT = 6400 // api超时时间
const FETCH_RETRY = 4 // get请求失败自动重试次数

const defaultHeaders = {
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  Connection: 'keep-alive',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Referer: HOST
}

/**
 * 统一请求方法
 * 若GET请求异常, 默认一段时间后重试retryCb, 直到成功
 * @param {*} param
 */
const _retry = {}
export default async function fetchAPI({
  method = 'GET',
  url,
  data = {},
  retryCb,
  info = '',
  noConsole = false
} = {}) {
  const isGet = method === 'GET'
  const userStore = getUserStoreAsync()
  const { accessToken } = userStore
  const _config = {
    timeout: FETCH_TIMEOUT,
    headers: {
      Authorization: `${accessToken.token_type} ${accessToken.access_token}`
    }
  }
  const body = {
    app_id: APP_ID,
    ...data
  }

  let _url = url
  let toastId
  if (isGet) {
    _config.method = 'GET'

    // 随机数防止接口CDN缓存
    body.state = getTimestamp()
    _url += `${_url.includes('?') ? '&' : '?'}${urlStringify(body)}`
  } else {
    _config.method = 'POST'
    _config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    _config.body = urlStringify(body)

    if (!noConsole) {
      toastId = Toast.loading('Loading...', 0, () => {
        if (toastId) Portal.remove(toastId)
      })
    }
  }
  if (SHOW_LOG) log(`🌐 ${info} ${_url}`)

  return fetch(_url, _config)
    .then(response => {
      if (toastId) Portal.remove(toastId)
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
          UIInfo('登陆过期')
          userStore.logout()
        }
        return Promise.resolve({})
      }

      // 接口某些字段为空返回null, 影响到解构的正常使用, 统一处理成空字符串
      return Promise.resolve(safe(json))
    })
    .catch(async err => {
      if (toastId) Portal.remove(toastId)

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

/**
 * 请求获取HTML
 *  - chii_cookietime=2592000
 *  - 2021/01/17 拦截瞬间多次完全同样的请求
 *
 * @param {*} param
 */
const lastFetchHTML = {}
export async function fetchHTML({
  method = 'GET',
  url,
  data = {},
  headers = {},
  cookie,
  raw = false
} = {}) {
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
  const _config = {
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

  let toastId
  if (isGet) {
    _config.method = 'GET'
    _config.headers = {
      ...defaultHeaders,
      ..._config.headers
    }
    if (Object.keys(body).length) {
      _url += `${_url.includes('?') ? '&' : '?'}${urlStringify(body)}`
    }
  } else {
    _config.method = 'POST'
    _config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    _config.body = urlStringify(body)
    toastId = Toast.loading('Loading...', 8, () => {
      if (toastId) Portal.remove(toastId)
    })
  }
  if (SHOW_LOG) log(`⚡️ ${_url}`)

  return fetch(_url, _config)
    .then(res => {
      if (!isGet) log(method, 'success', _url, _config, res)
      if (toastId) Portal.remove(toastId)
      return Promise.resolve(raw ? res : res.text())
    })
    .catch(error => {
      console.warn('[utils/fetch] fetchHTML', url, error)
      if (toastId) Portal.remove(toastId)
      return Promise.reject(error)
    })
}

/**
 * [待废弃] 带登陆信息的XMLHttpRequest
 * @param {*} params
 * @param {*} success
 * @param {*} fail
 */
export function xhr(
  { method = 'POST', url, data = {} } = {},
  success = Function.prototype,
  fail = Function.prototype
) {
  const userStore = getUserStoreAsync()
  const { cookie: userCookie, userAgent } = userStore.userCookie
  const toastId = Toast.loading('Loading...', 0, () => {
    if (toastId) Portal.remove(toastId)
  })
  const request = new XMLHttpRequest()
  request.onreadystatechange = () => {
    if (request.readyState !== 4) return
    if (toastId) Portal.remove(toastId)
    if (request.status === 200) {
      success(request.responseText)
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

/**
 * 自定义XHR
 */
export function xhrCustom({
  method = 'GET',
  url,
  data,
  headers = {},
  responseType,
  withCredentials = false,
  showLog = true
} = {}) {
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
    if (responseType) {
      request.responseType = responseType
    }

    const _headers = headers
    if (url.includes(HOST_CDN) && !_headers.Referer) {
      _headers.Referer = HOST
    }
    Object.keys(_headers).forEach(key => {
      request.setRequestHeader(key, headers[key])
    })

    const body = data ? urlStringify(data) : null
    request.send(body)

    if (SHOW_LOG && showLog) {
      log(`🔍 ${url}`)
    }
  })
}

/**
 * 带progress的xhr
 */
export function sax({
  method = 'GET',
  url,
  data,
  headers = {},
  responseType,
  withCredentials = false,
  onProgress = Function.prototype
} = {}) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    // eslint-disable-next-line prefer-arrow-callback
    const cb = debounce(function (response) {
      if (response.length < 1000) {
        return
      }

      log('[utils/fetch] sax', response.length)
      onProgress(response)
    }, 80)
    request.onreadystatechange = function () {
      if (this.readyState !== 4) {
        return cb(this._response)
      }

      if (this.status === 200) {
        return resolve(this)
      }

      console.warn('[utils/fetch] sax', url)
      if (this.status === 404) {
        return reject(new TypeError('404'))
      }

      if (this.status === 500) {
        return reject(new TypeError('500'))
      }

      return reject(new TypeError(this.status))
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
    if (responseType) {
      request.responseType = responseType
    }
    Object.keys(headers).forEach(key => {
      request.setRequestHeader(key, headers[key])
    })

    const body = data ? urlStringify(data) : null
    request.send(body)
    if (SHOW_LOG) {
      log(`[sax] ${url}`)
    }
  })
}

/**
 * hm v6.0
 * @param {*} url
 * @param {*} screen
 */
let lastHm = ''
export function hm(url, screen) {
  if (screen) {
    t('其他.查看', {
      screen
    })
  }

  try {
    // 保证这种低优先级的操作在UI响应之后再执行
    InteractionManager.runAfterInteractions(() => {
      const fullUrl =
        String(url).indexOf('http') === -1 ? `${HOST}/${url}` : url
      const query = {
        v: VERSION_GITHUB_RELEASE
      }
      const { isDark, isTinygrailDark } = getThemeStoreAsync()
      if (isDark) query.dark = 1
      if (screen) {
        if (screen.includes('Tinygrail') && isTinygrailDark) {
          query.tdark = 1
        }
        query.s = screen
      }
      const u = `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${urlStringify(
        query
      )}`
      lastHm = u
      if (DEV) log(`📌 ${u}`)

      const request = new XMLHttpRequest()
      request.open(
        'GET',
        `https://hm.baidu.com/hm.gif?${urlStringify({
          rnd: randomn(10),
          lt: getTimestamp(),
          si: IOS
            ? '8f9e60c6b1e92f2eddfd2ef6474a0d11'
            : '2dcb6644739ae08a1748c45fb4cea087',
          v: '1.2.51',
          api: '4_0',
          u
        })}`,
        true
      )
      request.withCredentials = true
      request.send(null)
    })
  } catch (error) {
    console.warn('[fetch] hm', error)
  }
}

/**
 * track
 * @param {*} u
 */
export function t(desc, eventData) {
  if (!desc) return

  if (IOS) {
    if (!DEV) return

    const eventId = events[desc]
    log(
      `${eventId ? '' : '找不到eventId '}🏷️  ${desc} ${
        eventData ? JSON.stringify(eventData) : ''
      }`
    )
    return
  }

  try {
    // 保证这种低优先级的操作在UI响应之后再执行
    InteractionManager.runAfterInteractions(() => {
      const eventId = events[desc]
      if (eventId) {
        if (eventData) {
          UMAnalyticsModule.onEventWithMap(
            eventId,
            eventId === '其他.崩溃'
              ? {
                  ...eventData,
                  url: lastHm
                }
              : eventData
          )
        } else {
          UMAnalyticsModule.onEvent(eventId)
        }
      }

      if (DEV) {
        log(
          `${eventId ? '' : '找不到eventId '}🏷️ ${desc} ${
            eventData ? JSON.stringify(eventData) : ''
          }`
        )
      }
    })
  } catch (error) {
    warn('utils/fetch', 't', error)
  }
}

/**
 * 接口防并发请求问题严重, 暂时延迟一下, n个请求一组
 * @param {*} fetchs
 */
export async function queue(fetchs, num = 2) {
  if (!fetchs.length) return false

  await Promise.all(
    new Array(num).fill(0).map(async () => {
      while (fetchs.length) {
        // eslint-disable-next-line no-await-in-loop
        await fetchs.shift()()
      }
    })
  )
  return true
}

/**
 * 百度翻译
 * @param {*} query
 */
export async function baiduTranslate(query, to = 'zh') {
  try {
    const appid = APP_ID_BAIDU // 秘密
    const salt = new Date().getTime()
    const from = 'auto'
    const q = query.split('\r\n').join('\n')
    const sign = md5(`${appid}${q}${salt}${BAIDU_KEY}`)
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
    warn('utils/fetch.js', 'baiduTranslate', error)
    return false
  }
}

/**
 * 接口某些字段为空返回null, 影响到es6函数初始值的正常使用, 统一处理成空字符串
 * @param {*} data
 * @url https://jsperf.com/moved-null-2
 */
function safe(data) {
  if (data instanceof Object) {
    // eslint-disable-next-line no-param-reassign
    Object.keys(data).forEach(k => (data[k] = safe(data[k])))
  }
  return data === null ? '' : data
}
