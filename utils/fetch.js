/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
/*
 * 请求相关
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-21 13:30:17
 */
import { Alert } from 'react-native'
import { Portal, Toast } from '@ant-design/react-native'
import {
  APP_ID,
  HOST_NAME,
  HOST,
  IOS,
  GITHUB_RELEASE_VERSION,
  CODE_PUSH_VERSION
} from '@constants'
import { urlStringify, sleep, getTimestamp, randomn } from './index'
import { log } from './dev'
import { info as UIInfo } from './ui'

const FETCH_ERR_RETRY_COUNT = 5 // GET请求失败重试次数

/**
 * 统一请求方法
 * 若GET请求异常, 默认一段时间后重试retryCb, 直到成功
 * @param {*} param
 */
const retryCount = {}
export default async function _fetch({
  method = 'GET',
  url,
  data = {},
  retryCb,
  info = '',
  noConsole = false
} = {}) {
  // 避免userStore循环引用
  const userStore = require('../stores/user').default
  const {
    token_type: tokenType,
    access_token: accessToken
  } = userStore.accessToken
  const _config = {
    headers: {
      Authorization: `${tokenType} ${accessToken}`
    }
  }
  const isGet = method === 'GET'
  const body = {
    app_id: APP_ID,
    ...data
  }

  let _url = url
  let toastKey
  if (isGet) {
    // 随机数防止接口CDN缓存
    body.state = getTimestamp()
    _url = `${url}?${urlStringify(body)}`
  } else {
    _config.method = 'POST'
    _config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    _config.body = urlStringify(body)

    if (!noConsole) {
      toastKey = Toast.loading('Loading...', 0)
    }
  }
  // log(info, _url, !isGet && _config)

  return fetch(_url, _config)
    .then(response => {
      if (toastKey) {
        Portal.remove(toastKey)
      }
      return response.json()
    })
    .then(json => {
      // 成功后清除失败计数
      if (isGet) {
        const key = `${url}|${urlStringify(data)}`
        if (retryCount[key]) {
          retryCount[key] = 0
        }
      } else if (!noConsole) {
        // log(method, 'success', url, _config, info, json)
      }

      // @issue 由于Bangumi提供的API没有统一返回数据
      // 正常情况没有code, 错误情况例如空的时候, 返回 {code: 400, err: '...'}
      if (json && json.error) {
        if (json.error === 'invalid_token') {
          UIInfo('登录过期')
          userStore.logout()
        }
        return Promise.resolve({})
      }

      // 接口某些字段为空返回null, 影响到解构的正常使用, 统一处理成空字符串
      return Promise.resolve(safe(json))
    })
    .catch(async err => {
      if (toastKey) {
        Portal.remove(toastKey)
      }

      // @issue Bangumi提供的API频繁请求非常容易报错, 也就只能一直请求到成功为止了
      if (isGet && typeof retryCb === 'function') {
        await sleep()

        const key = `${url}|${urlStringify(data)}`
        retryCount[key] = (retryCount[key] || 0) + 1

        if (retryCount[key] < FETCH_ERR_RETRY_COUNT) {
          // log('re-fetch', `fail ${retryCount[key]} time`, url, info, err)
          return retryCb()
        }
      }

      UIInfo(`${info}请求失败`)
      return Promise.reject(err)
    })
}

/**
 * 请求获取HTML
 * @param {*} param
 */
export async function fetchHTML({
  method = 'GET',
  url,
  data = {},
  headers = {},
  cookie
} = {}) {
  const userStore = require('../stores/user').default
  const { cookie: userCookie, userAgent } = userStore.userCookie
  const _config = {
    method,
    headers: {}
  }
  const isGet = method === 'GET'
  const body = {
    ...data
  }

  let _url = url.replace('!', '') // 叹号代表不携带cookie
  if (url.indexOf('!') !== 0) {
    _config.headers = IOS
      ? {
          'User-Agent': userAgent,

          // @issue iOS不知道为什么会有文本乱插在cookie前面, 要加分号防止
          Cookie: cookie
            ? `; ${userCookie}; chii_cookietime=0; ${cookie};`
            : `; ${userCookie}; chii_cookietime=0;`,
          ...headers
        }
      : {
          'User-Agent': userAgent,
          Cookie: cookie
            ? `${userCookie}; chii_cookietime=0; ${cookie}`
            : `${userCookie}; chii_cookietime=0`,
          ...headers
        }
  }

  let toastKey
  if (isGet) {
    _config.headers['Cache-Control'] = 'max-age=0'
    _config.headers.Connection = 'keep-alive'

    if (Object.keys(body).length) {
      _url += `${_url.includes('?') ? '&' : '?'}${urlStringify(body)}`
    }
  } else {
    _config.method = 'POST'
    _config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // _config.credentials ='includes'
    _config.body = urlStringify(body)
    toastKey = Toast.loading('Loading...', 0)
  }
  // log(_url, _config)

  const systemStore = require('../stores/system').default
  return fetch(_url, _config)
    .then(res => {
      // 开发模式
      if (systemStore.state.dev) {
        Alert.alert(
          'dev',
          `${JSON.stringify(_url)} ${JSON.stringify(_config)} ${res._bodyInit}`
        )
      }

      // POST打印结果
      if (!isGet) {
        log(method, 'success', _url, _config, res)
      }

      // 清除Toast
      if (toastKey) {
        Portal.remove(toastKey)
      }

      return Promise.resolve(res._bodyInit)
    })
    .catch(err => {
      if (systemStore.state.dev) {
        Alert.alert(
          `${JSON.stringify(_url)} ${JSON.stringify(_config)} ${JSON.stringify(
            err
          )}`
        )
      }
      if (toastKey) {
        Portal.remove(toastKey)
      }

      return Promise.reject(err)
    })
}

/**
 * XMLHttpRequest
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

  const toastKey = Toast.loading('Loading...', 0)
  const request = new XMLHttpRequest()
  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return
    }

    if (toastKey) {
      Portal.remove(toastKey)
    }
    if (request.status === 200) {
      success(request.responseText)
    } else {
      fail()
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
  responseType
} = {}) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        resolve(this)
      }
    }
    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }
    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }
    xhr.onabort = function() {
      reject(new TypeError('AbortError'))
    }

    request.open(method, url, true)
    request.withCredentials = false
    if (responseType) {
      request.responseType = responseType
    }
    Object.keys(headers).forEach(key => {
      request.setRequestHeader(key, headers[key])
    })

    const body = data ? urlStringify(data) : null
    request.send(body)
  })
}

/**
 * @param {*} url
 * @param {*} title
 */
export function hm(url, title) {
  let version = GITHUB_RELEASE_VERSION
  if (CODE_PUSH_VERSION) {
    version += `-${CODE_PUSH_VERSION}`
  }

  try {
    const userStore = require('../stores/user').default
    const { userAgent } = userStore.userCookie
    let u = String(url).indexOf('http' === -1) ? `${HOST}/${url}` : url
    u += `${u.includes('?') ? '&' : '?'}v=${version}`
    const query = {
      lt: getTimestamp(),
      rnd: randomn(10),
      si: '2dcb6644739ae08a1748c45fb4cea087',
      v: '1.2.51',
      api: '4_0',
      u,
      tt: title
    }

    fetch(`https://hm.baidu.com/hm.gif?${urlStringify(query)}`, {
      headers: {
        'User-Agent': userAgent
      }
    })
  } catch (error) {
    // do nothing
  }
}

/**
 * @todo 接口防并发请求问题严重, 暂时延迟一下, 2个请求一组
 * @param {*} fetchs
 */
export async function queue(fetchs = []) {
  const [
    f1 = Function.prototype,
    f2 = Function.prototype,
    f3 = Function.prototype,
    f4 = Function.prototype,
    f5 = Function.prototype,
    f6 = Function.prototype
  ] = fetchs
  await Promise.all([f1(), f2()])
  await sleep()
  await Promise.all([f3(), f4()])
  await sleep()
  return Promise.all([f5(), f6()])
}

// async function queue(fetchs = [], resolved = []) {
//   if (!fetchs.length) return resolved
//   resolved.push(...(await Promise.all(fetchs.slice(0, 2))))
//   await sleep()
//   return queue(fetchs.slice(2), resolved)
// }

/**
 * 接口某些字段为空返回null, 影响到es6函数初始值的正常使用, 统一处理成空字符串
 * @param {*} data
 */
function safe(data) {
  return JSON.parse(JSON.stringify(data).replace(/:null/g, ':""'))
}
