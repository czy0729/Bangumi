/*
 * 请求相关
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-09 23:41:12
 */
import { Alert } from 'react-native'
import { Portal, Toast } from '@ant-design/react-native'
import { APP_ID, HOST_NAME, HOST } from '@constants'
import { urlStringify, sleep, getTimestamp, randomn } from './index'
import { log } from './dev'
import { info as UIInfo } from './ui'

const ERR_RETRY_COUNT = 5 // GET请求失败重试次数

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
    body.state = getTimestamp() // 随机数防止接口CDN缓存
    _url = `${url}?${urlStringify(body)}`

    log(info, _url)
  } else {
    _config.method = 'POST'
    _config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    _config.body = urlStringify(body)

    if (!noConsole) {
      toastKey = Toast.loading('Loading...', 0)
    }
    log(info, _url, _config)
  }

  return fetch(_url, _config)
    .then(response => {
      if (toastKey) {
        Portal.remove(toastKey)
      }
      return response.json()
    })
    .then(res => {
      // 成功后清除失败计数
      if (isGet) {
        const key = `${url}|${urlStringify(data)}`
        if (retryCount[key]) {
          retryCount[key] = 0
        }
      } else if (!noConsole) {
        log(method, 'success', url, _config, info, res)
      }

      // @issue 由于Bangumi提供的API没有统一返回数据
      // 正常情况没有code, 错误情况例如空的时候, 返回 {code: 400, err: '...'}
      if (res && res.error) {
        if (res.error === 'invalid_token') {
          UIInfo('登录过期')
          userStore.logout()
        }
        return Promise.resolve({})
      }

      // 接口某些字段为空返回null, 影响到解构的正常使用, 统一处理成空字符串
      return Promise.resolve(safe(res))
    })
    .catch(async err => {
      if (toastKey) {
        Portal.remove(toastKey)
      }

      // @issue Bangumi提供的API的代理经常报错, 我也就只能一直请求到成功为止了hhh
      if (isGet && typeof retryCb === 'function') {
        await sleep()

        const key = `${url}|${urlStringify(data)}`
        retryCount[key] = (retryCount[key] || 0) + 1

        if (retryCount[key] < ERR_RETRY_COUNT) {
          log('re-fetch', `fail ${retryCount[key]} time`, url, info, err)
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
  const { cookie: userCookie } = userStore.userCookie
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
    _config.headers = {
      // 'User-Agent': userAgent,

      // 前面这个分号很重要, CDN那边经常给我加一堆乱七八糟的会搞坏cookie
      Cookie: cookie ? `; ${userCookie}; ${cookie};` : `; ${userCookie};`,
      ...headers
    }
  }

  let toastKey
  if (isGet) {
    _config.headers['Cache-Control'] = 'max-age=0'
    _config.headers.Connection = 'keep-alive'
    body.state = getTimestamp() // 随机数防止接口CDN缓存
    _url = `${_url}?${urlStringify(body)}`
  } else {
    _config.method = 'POST'
    _config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // _config.credentials ='includes'
    _config.body = urlStringify(body)
    toastKey = Toast.loading('Loading...', 0)
  }
  log(_url, _config)

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

      // return Promise.resolve(res.text())
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
  const { cookie: userCookie } = userStore.userCookie

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
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  request.setRequestHeader('Cookie', userCookie)
  // request.setRequestHeader('User-Agent', userAgent)
  request.setRequestHeader('Host', HOST_NAME)
  request.setRequestHeader('accept-encoding', 'gzip, deflate')
  request.send(urlStringify(data))
}

/**
 * @param {*} url
 * @param {*} title
 */
export function hm(url, title) {
  try {
    const userStore = require('../stores/user').default
    const query = {
      lt: getTimestamp(),
      rnd: randomn(10),
      si: '2dcb6644739ae08a1748c45fb4cea087',
      v: '1.2.51',
      api: '4_0',
      u: String(url).indexOf('http' === -1) ? `${HOST}/${url}` : url,
      tt: title
    }

    fetch(`https://hm.baidu.com/hm.gif?${urlStringify(query)}`, {
      headers: {
        'User-Agent': userStore.userCookie.userAgent
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

/**
 * 接口某些字段为空返回null, 影响到解构的正常使用, 统一处理成空字符串
 * @param {*} res
 */
function safe(res) {
  return JSON.parse(JSON.stringify(res).replace(/:null/g, ':""'))
}
