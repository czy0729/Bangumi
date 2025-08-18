/*
 * 使用 RN.fetch 的请求 (待废弃, 尽量少用)
 * @Author: czy0729
 * @Date: 2022-08-06 12:36:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 23:32:13
 */
import { API_HOST, API_V0 } from '@constants/api'
import { APP_ID, HOST, UA } from '@constants/constants'
import { WEB } from '@constants/device'
import { HOST_PROXY } from '@src/config'
import { syncUserStore } from '../async'
import { isDevtoolsOpen } from '../dom'
import fetch from '../thirdParty/fetch-polyfill'
import { loading } from '../ui'
import { getTimestamp, sleep, urlStringify } from '../utils'
import { log, safe, safeCookie } from './utils'
import { FETCH_RETRY, FETCH_TIMEOUT, HEADERS_DEFAULT } from './ds'
import { Body, Config, FetchAPIArgs, FetchHTMLArgs } from './types'

const RETRY_CACHE = {}

/**
 * 统一请求方法
 *  - 若 GET 请求异常, 默认一段时间后重试 retryCb, 直到成功
 **/
export async function fetchAPI(args: FetchAPIArgs): Promise<any> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  const {
    method = 'GET',
    url,
    data = {},
    retryCb,
    // info = '',
    noConsole = false
  } = args || {}
  const isGet = method === 'GET'
  const config: Config = {
    method: isGet ? 'GET' : 'POST',
    headers: {},
    timeout: FETCH_TIMEOUT
  }

  if (!WEB) {
    config.headers['User-Agent'] = UA
  }

  /** @todo [网页端] POST 请求需要携带授权信息, 暂没接入 */
  if (WEB && !isGet) {
    log('fetchAPI', 'fetchAPI denied:', url)
    return Promise.reject('denied')
  }

  const { accessToken } = syncUserStore()
  if (accessToken.access_token) {
    /** @todo [网页端] 旧 API 不支持新的 token, 需要重构相关部分的逻辑代码 */
    if (WEB && url.includes(API_HOST) && !url.includes(API_V0)) {
      log('fetchAPI', 'fetchAPI ignored token:', url)
    } else {
      config.headers.Authorization = `${accessToken.token_type} ${accessToken.access_token}`
    }
  }

  const body: Body = {
    app_id: APP_ID,
    ...data
  }
  let _url = url
  let hideCb: () => void

  if (isGet) {
    body.state = getTimestamp() // 随机数防止接口 CDN 缓存
    _url += `${_url.includes('?') ? '&' : '?'}${urlStringify(body)}`
  } else {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.body = urlStringify(body)
    if (!noConsole) hideCb = loading()
  }

  return fetch(_url, config)
    .then(response => {
      if (hideCb) hideCb()

      // @ts-expect-error
      return response.json()
    })
    .then(json => {
      if (isGet) {
        const key = `${url}|${urlStringify(data)}`

        // 成功后清除失败计数
        if (RETRY_CACHE[key]) RETRY_CACHE[key] = 0
      }

      // @issue 由于 Bangumi 提供的 API 没有统一返回数据
      // 正常情况没有 code, 错误情况例如空的时候, 返回 { code: 400, err: '...' }
      if (json?.error) {
        if (json.error === 'invalid_token') {
          syncUserStore().setOutdate()
        }

        return Promise.resolve({
          code: json.code,
          error: json.error,
          request: json.request
        })
      }

      // 接口某些字段为空返回 null, 影响到解构的正常使用, 统一处理成空字符串
      return Promise.resolve(safe(json))
    })
    .catch(async err => {
      if (hideCb) hideCb()

      // @issue Bangumi 提供的 API 频繁请求非常容易报错, 也就只能一直请求到成功为止了
      if (isGet && typeof retryCb === 'function') {
        await sleep()

        const key = `${url}|${urlStringify(data)}`
        RETRY_CACHE[key] = (RETRY_CACHE[key] || 0) + 1
        if (RETRY_CACHE[key] < FETCH_RETRY) return retryCb()
      }

      return Promise.reject(err)
    })
}

const LAST_FETCH_HTML = {}

/**
 * 携带授权信息请求获取 html
 *  - 拦截瞬间多次完全同样的请求
 *  - args.url 开头带叹号!代表不携带授权信息
 */
export async function fetchHTML(args: FetchHTMLArgs): Promise<any> {
  if (isDevtoolsOpen()) return Promise.reject('denied')

  const { method = 'GET', url, data = {}, headers = {}, cookie, raw = false } = args || {}
  const isGet = method === 'GET'

  /** @todo [网页端] POST 请求需要携带授权信息, 暂没接入 */
  if (WEB && !isGet) {
    log('fetchHTML', 'fetchHTML denied:', url)
    return Promise.reject('denied')
  }

  // 拦截瞬间多次完全同样的请求
  if (isGet) {
    const cacheKey = JSON.stringify({
      url,
      data,
      headers,
      cookie
    })
    const ts = new Date().valueOf()
    if (!LAST_FETCH_HTML[cacheKey]) {
      LAST_FETCH_HTML[cacheKey] = ts
    } else {
      const distance = ts - LAST_FETCH_HTML[cacheKey]
      if (distance <= 2000) return Promise.reject(new Error(`[prevent] ${url} ${distance}ms`))

      LAST_FETCH_HTML[cacheKey] = ts
    }
  }

  const userStore = syncUserStore()
  const { cookie: userCookie, setCookie, userAgent } = userStore.userCookie
  const _config: Config = {
    timeout: FETCH_TIMEOUT,
    headers: {}
  }
  const body: Body = {
    ...data
  }

  let _url = url.replace('!', '') // 叹号代表不携带 cookie
  if (url.indexOf('!') !== 0) {
    _config.headers = {
      'User-Agent': userAgent,

      // @issue iOS 不知道为什么会有文本乱插在cookie前面, 要加分号防止
      Cookie: cookie ? `${userCookie} ${cookie} ${setCookie}` : `; ${userCookie}; ${setCookie}`,
      ...headers
    }

    // @notice 遗留问题, 要把 chii_cookietime=0 换成 chii_cookietime=2592000, 而且必带 chii_cookietime
    if (_config.headers.Cookie.includes('chii_cookietime=0')) {
      _config.headers.Cookie = _config.headers.Cookie.replace(
        'chii_cookietime=0',
        'chii_cookietime=2592000'
      )
    } else if (!_config.headers.Cookie.includes('chii_cookietime=2592000')) {
      _config.headers.Cookie = `${_config.headers.Cookie}; chii_cookietime=2592000;`
    }
  }
  _config.headers.Cookie = safeCookie(_config.headers.Cookie)

  let hideCb: () => void
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
    hideCb = loading('Loading...', 8)
  }

  if (WEB && HOST_PROXY) {
    _url = _url.replace(HOST, HOST_PROXY)

    // 反代穿透
    if (_config?.headers?.Cookie) _config.headers['X-Cookie'] = _config.headers.Cookie
  }

  return fetch(_url, _config)
    .then(res => {
      if (!isGet) log('fetchHTML', method, 'success', _url, _config, res)
      if (hideCb) hideCb()

      // @ts-expect-error
      return Promise.resolve(raw ? res : res.text())
    })
    .catch(error => {
      if (hideCb) hideCb()
      log('fetchHTML', 'catch error:', url, error)

      return Promise.reject(error)
    })
}
