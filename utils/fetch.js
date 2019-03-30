/*
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-28 18:12:36
 */
import { AsyncStorage } from 'react-native'
import { Toast } from '@ant-design/react-native'
import { APP_ID } from '@constants'
import { urlStringify, sleep, getTimestamp } from './index'
import { log } from './dev'

// const STATUS_SUCCESS = 200
// const STATUS_ACCEPTED = 202
// const STATUS_NOT_MODIFIED = 304
// const STATUS_BAD_REQUEST = 400
// const STATUS_UNAUTHORIZED = 401
// const STATUS_NOT_FOUND = 404
// const STATUS_METHOD_NOT_ALLOWED = 405

/**
 * 统一请求方法
 * 若GET请求异常, 500ms后重试retryCb, 直到成功
 * @version 190303 1.2
 * @param {*} param
 */
const retryCount = {}
export default async function _fetch(config = {}) {
  const { url, data = {}, method = 'GET', retryCb, info = '' } = config
  const tokenType =
    (await AsyncStorage.getItem('@userStore:tokenType')) || 'Bearer'
  const accessToken =
    (await AsyncStorage.getItem('@userStore:accessToken')) ||
    'e8f04774b3abb68b5642d48d9ce8e589a3cd1043'
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

  return fetch(_url, _config)
    .then(response => response.json())
    .then(res => {
      // 成功后清除失败计数
      if (isGet) {
        const key = `${url}|${urlStringify(data)}`
        if (retryCount[key]) {
          retryCount[key] = 0
        }
      }
      // log(method, 'success', _url, config, !isGet ? res : 'not show')
      return Promise.resolve(res)
    })
    .catch(async err => {
      // NOTE Bangumi的接口代理经常报错, 我也就只能一直请求到成功为止了hhh
      if (isGet && typeof retryCb === 'function') {
        await sleep(1000)

        const key = `${url}|${urlStringify(data)}`
        retryCount[key] = (retryCount[key] || 0) + 1

        if (retryCount[key] < 3) {
          log('re-fetch', `fail ${retryCount[key]} time`, _url, config, err)
          return retryCb()
        }
      }
      Toast.info(`${info}请求失败`)
      return Promise.reject(err)
    })
}

/**
 * 请求获取HTML
 * @version 190323 1.0
 * @param {*} param
 */
export async function fetchHTML(config = {}) {
  const { url } = config
  return fetch(url).then(res => Promise.resolve(res._bodyInit))
}

/**
 * @TODO
 * 接口防并发请求问题严重, 暂时延迟一下, 2个请求一组
 * @param {*} fetchs
 */
export async function queue(fetchs = []) {
  const [
    f1 = Function.prototype,
    f2 = Function.prototype,
    f3 = Function.prototype,
    f4 = Function.prototype
  ] = fetchs
  await Promise.all([f1(), f2()])
  return Promise.all([f3(), f4()])
}
