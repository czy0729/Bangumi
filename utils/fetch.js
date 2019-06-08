/*
 * 请求相关
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-08 23:57:02
 */
import { Alert } from 'react-native'
import { Portal, Toast } from '@ant-design/react-native'
import { APP_ID } from '@constants'
import { urlStringify, sleep, getTimestamp } from './index'
import { log } from './dev'
import { info as UIInfo } from './ui'

// const STATUS_SUCCESS = 200
// const STATUS_ACCEPTED = 202
// const STATUS_NOT_MODIFIED = 304
// const STATUS_BAD_REQUEST = 400
// const STATUS_UNAUTHORIZED = 401
// const STATUS_NOT_FOUND = 404
// const STATUS_METHOD_NOT_ALLOWED = 405

const OFFLINE = false
const ERR_RETRY_COUNT = 5 // GET请求失败重试次数

// 防止cookie过期
const cacheHeaders = {
  // Accept:
  //   'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  // 'Accept-Encoding': 'gzip, deflate, br',
  // 'Accept-Language': 'zh-CN,zh;q=0.9',
  'Cache-Control': 'max-age=0',
  Connection: 'keep-alive'
  // Host: HOST_NAME,
  // Referer: `${HOST}/`,
  // 'Upgrade-Insecure-Requests': 1
}

/**
 * 统一请求方法
 * 若GET请求异常, 默认一段时间后重试retryCb, 直到成功
 * @version 190303 1.2
 * @param {*} param
 */
const retryCount = {}
export default async function _fetch({
  method = 'GET',
  url,
  data = {},
  retryCb,
  info = ''
} = {}) {
  if (OFFLINE) {
    return false
  }

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
  if (!isGet) {
    _config.method = 'POST'
    _config.headers['content-type'] = 'application/x-www-form-urlencoded'
    _config.body = urlStringify(body)
  } else {
    body.state = getTimestamp() // 随机数防止接口CDN缓存
    _url = `${url}?${urlStringify(body)}`
  }
  log(info, _url)

  let key
  if (method === 'POST') {
    key = Toast.loading('Loading...', 0)
    log(info, _url, _config)
  } else {
    log(info, _url)
  }
  return fetch(_url, _config)
    .then(response => {
      if (key) {
        Portal.remove(key)
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
      } else {
        log(method, 'success', url, data, info, res)
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
      if (key) {
        Portal.remove(key)
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
 * @version 190323 1.0
 * @param {*} param
 */
export async function fetchHTML({
  method = 'GET',
  url,
  headers = {},
  cookie
} = {}) {
  if (OFFLINE) {
    return false
  }

  const userStore = require('../stores/user').default
  const { userAgent, cookie: userCookie } = userStore.userCookie
  const data = {
    method
  }

  let _url = url.replace('!', '') // 叹号代表不携带cookie
  if (url.indexOf('!') !== 0) {
    data.headers = {
      'User-Agent': userAgent,

      // 前面这个分号很重要, CDN那边经常给我加一堆乱七八糟的会搞坏cookie
      Cookie: cookie ? `; ${userCookie}; ${cookie};` : `; ${userCookie};`,
      ...cacheHeaders,
      ...headers
    }
  }

  // 加上时间戳防止缓存
  const state = getTimestamp()
  if (_url.indexOf('?') === -1) {
    _url = `${_url}?state=${state}`
  } else {
    _url = `${_url}&state=${state}`
  }
  log(_url, data)

  let key
  if (method === 'POST') {
    key = Toast.loading('Loading...', 0)
  }

  const systemStore = require('../stores/system').default
  return fetch(_url, data)
    .then(res => {
      if (systemStore.state.dev) {
        Alert.alert(
          'dev',
          `${JSON.stringify(_url)} ${JSON.stringify(data)} ${res._bodyInit}`
        )
      }
      if (key) {
        Portal.remove(key)
      }

      return Promise.resolve(res._bodyInit)
    })
    .catch(e => {
      if (systemStore.state.dev) {
        Alert.alert(
          `${JSON.stringify(_url)} ${JSON.stringify(data)} ${JSON.stringify(e)}`
        )
      }
      if (key) {
        Portal.remove(key)
      }
    })
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
