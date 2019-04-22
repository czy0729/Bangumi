/*
 * 请求相关
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-22 18:53:04
 */
import { Toast } from '@ant-design/react-native'
import { APP_ID } from '@constants'
import { urlStringify, sleep, getTimestamp } from './index'
import { log } from './dev'

const ERR_RETRY_COUNT = 3 // GET请求失败重试次数
// const STATUS_SUCCESS = 200
// const STATUS_ACCEPTED = 202
// const STATUS_NOT_MODIFIED = 304
// const STATUS_BAD_REQUEST = 400
// const STATUS_UNAUTHORIZED = 401
// const STATUS_NOT_FOUND = 404
// const STATUS_METHOD_NOT_ALLOWED = 405

/**
 * 统一请求方法
 * 若GET请求异常, 默认一段时间后重试retryCb, 直到成功
 * @version 190303 1.2
 * @param {*} param
 */
const retryCount = {}
export default async function _fetch({
  url,
  data = {},
  method = 'GET',
  retryCb,
  info = ''
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
      } else {
        log(method, 'success', url, data, info, res)
      }

      // @issue 由于Bangumi提供的API没有统一返回数据
      // 正常情况没有code, 错误情况例如空的时候, 返回{code: 400, err: '...'}
      if (res && res.error) {
        if (res.error === 'invalid_token') {
          Toast.info('登录过期')
          userStore.logout()
        }
        return Promise.resolve({})
      }

      // if (_url.indexOf('https://api.bgm.tv/user/456208/progress') !== -1) {
      //   console.log(_url, _config, JSON.stringify(safe(res)))
      // }

      // 接口某些字段为空返回null, 影响到解构的正常使用, 统一处理成空字符串
      return Promise.resolve(safe(res))
    })
    .catch(async err => {
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
      Toast.info(`${info}请求失败`)
      return Promise.reject(err)
    })
}

/**
 * 请求获取HTML
 * @version 190323 1.0
 * @param {*} param
 */
export async function fetchHTML({ url } = {}) {
  // const userStore = require('../stores/user').default
  // let { userCookie } = userStore
  // if (!userCookie) {
  //   userCookie = await userStore.getStorage('userCookie')
  // }

  log('HTML', 'fetch', url)
  const data = {
    method: 'GET'
  }

  if (url.indexOf('!') !== 0) {
    data.headers = {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
      Cookie:
        // eslint-disable-next-line max-len
        '__utmz=1.1555120637.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); chii_cookietime=0; __utma=1.158421289.1555120637.1555572370.1555588783.31; __utmc=1; __utmt=1; chii_auth=1F1x%2F%2B%2FI6xZMGqClBkBqX7xFaxcYp%2FYqZdXb7fcsBrj5KqSAYhb1LPRRjPoumbh5Lmb9NGgfSlM63avajmOO78RV0nzrnEkeoCAi; chii_sid=pqUt9U; __utmb=1.14.10.1555588783'
    }
  }

  // 加上时间戳防止缓存
  let _url = url.replace('!', '')
  const state = getTimestamp()
  if (_url.indexOf('?')) {
    _url = `${_url}&${state}`
  } else {
    _url = `${_url}?${state}`
  }

  return fetch(_url, data).then(res => Promise.resolve(res._bodyInit))
}

/**
 * @todo
 * 接口防并发请求问题严重, 暂时延迟一下, 2个请求一组
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
