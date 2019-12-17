/* eslint-disable space-before-function-paren, func-names */
/*
 * 请求相关
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-17 14:24:26
 */
import { Alert, NativeModules } from 'react-native'
import Constants from 'expo-constants'
import { Portal, Toast } from '@ant-design/react-native'
import {
  IOS,
  APP_ID,
  HOST_NAME,
  HOST,
  VERSION_GITHUB_RELEASE,
  DEV
} from '@constants'
import events from '@constants/events'
import fetch from './thirdParty/fetch-polyfill'
import { urlStringify, sleep, getTimestamp, randomn } from './index'
import { log } from './dev'
import { info as UIInfo } from './ui'

const UMAnalyticsModule = NativeModules.UMAnalyticsModule
const TIMEOUT = 10000
const FETCH_RETRY_COUNT = 5 // GET请求失败重试次数
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
let ua = '' // 缓存userAgent

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
  const userStore = require('../stores/user').default
  const { accessToken } = userStore
  const _config = {
    timeout: TIMEOUT,
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
    _url += `?${urlStringify(body)}`
  } else {
    _config.method = 'POST'
    _config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    _config.body = urlStringify(body)
    if (!noConsole) {
      toastId = Toast.loading('Loading...', 0)
    }
  }
  log(`[fetchAPI] ${info || _url}`)

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
        if (_retry[key] < FETCH_RETRY_COUNT) {
          return retryCb()
        }
      }

      UIInfo(`${info}请求失败`)
      return Promise.reject(err)
    })
}

/**
 * 请求获取HTML
 * chii_cookietime=2592000
 * @param {*} param
 */
export async function fetchHTML({
  method = 'GET',
  url,
  data = {},
  headers = {},
  cookie
} = {}) {
  const isGet = method === 'GET'
  const userStore = require('../stores/user').default
  const { cookie: userCookie, userAgent } = userStore.userCookie
  const _config = {
    timeout: TIMEOUT,
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
      Cookie: cookie ? `${userCookie} ${cookie}` : `; ${userCookie};`,
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
    toastId = Toast.loading('Loading...', 8)
  }
  log(`[fetchHTML] ${_url}`)

  const isDev = require('../stores/system').default.state.dev
  return fetch(_url, _config)
    .then(res => {
      // 开发模式
      if (isDev) {
        Alert.alert(
          'dev',
          `${JSON.stringify(_url)} ${JSON.stringify(_config)} ${res._bodyInit}`
        )
      }
      if (!isGet) log(method, 'success', _url, _config, res)
      if (toastId) Portal.remove(toastId)
      return Promise.resolve(res.text())
    })
    .catch(err => {
      if (isDev) {
        Alert.alert(
          `${JSON.stringify(_url)} ${JSON.stringify(_config)} ${JSON.stringify(
            err
          )}`
        )
      }
      if (toastId) Portal.remove(toastId)
      return Promise.reject(err)
    })
}

/**
 * [待废弃] XMLHttpRequest
 * @param {*} params
 * @param {*} success
 * @param {*} fail
 */
export function xhr(
  { method = 'POST', url, data = {} } = {},
  success = Function.prototype,
  fail = Function.prototype
) {
  // 避免userStore循环引用
  const userStore = require('../stores/user').default
  const { cookie: userCookie, userAgent } = userStore.userCookie

  const toastId = Toast.loading('Loading...', 0)
  const request = new XMLHttpRequest()
  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return
    }

    if (toastId) {
      Portal.remove(toastId)
    }

    if (request.status === 200) {
      success(request.responseText)
    } else {
      fail(request)
    }
  }

  request.open(method, url)
  request.withCredentials = false
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  request.setRequestHeader('Cookie', userCookie)
  request.setRequestHeader('User-Agent', userAgent)
  request.setRequestHeader('Host', HOST_NAME)
  request.setRequestHeader('accept-encoding', 'br, gzip, deflate')
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
  withCredentials = false
} = {}) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        resolve(this)
      }
    }
    request.onerror = function() {
      reject(new TypeError('Network request failed'))
    }
    request.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }
    request.onabort = function() {
      reject(new TypeError('AbortError'))
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
    log(`[xhrCustom] ${url}`)
  })
}

/**
 * hm v4.0
 * @param {*} url
 * @param {*} screen
 */
export async function hm(url, screen) {
  if (DEV) return
  try {
    if (!ua) ua = await Constants.getWebViewUserAgentAsync()

    let u = String(url).indexOf('http') === -1 ? `${HOST}/${url}` : url
    u += `${u.includes('?') ? '&' : '?'}v=${VERSION_GITHUB_RELEASE}`
    u += `${require('../stores/theme').default.isDark ? '&dark=1' : ''}`
    u += `${screen ? `&s=${screen}` : ''}`
    fetch(
      `https://hm.baidu.com/hm.gif?${urlStringify({
        rnd: randomn(10),
        si: IOS
          ? '8f9e60c6b1e92f2eddfd2ef6474a0d11'
          : '2dcb6644739ae08a1748c45fb4cea087',
        v: '1.2.51',
        api: '4_0',
        u
        // lt: getTimestamp()
      })}`,
      {
        headers: {
          'User-Agent':
            ua || require('../stores/user').default.userCookie.userAgent
        }
      }
    )
  } catch (error) {
    console.warn('[fetch] hm', error)
  }
}
/**
 * track
 * @param {*} u
 */
export function t(desc, eventData) {
  if (!desc) {
    return
  }

  if (IOS) {
    if (!DEV) {
      return
    }
    log(`[track] ${desc} ${eventData ? JSON.stringify(eventData) : ''}`)
    return
  }

  try {
    const eventId = events[desc]
    if (eventId) {
      if (eventData) {
        UMAnalyticsModule.onEventWithMap(eventId, eventData)
      } else {
        UMAnalyticsModule.onEvent(eventId)
      }

      if (DEV) {
        log(`[track] ${desc} ${eventData ? JSON.stringify(eventData) : ''}`)
      }
    }
  } catch (error) {
    warn('utils/fetch', 't', error)
  }
}

/**
 * 接口防并发请求问题严重, 暂时延迟一下, n个请求一组
 * @param {*} fetchs
 */
export async function queue(fetchs, num = 2) {
  await Promise.all(
    new Array(num).fill(0).map(async () => {
      while (fetchs.length) {
        // eslint-disable-next-line no-await-in-loop
        await fetchs.shift()()
      }
    })
  )
}

/**
 * 接口某些字段为空返回null, 影响到es6函数初始值的正常使用, 统一处理成空字符串
 * @param {*} data
 */
function safe(data) {
  return JSON.parse(JSON.stringify(data).replace(/:null/g, ':""'))
}
