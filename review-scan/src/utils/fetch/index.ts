/*
 * 请求相关
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 13:01:20
 */
import { err, hm, t, ua, withT } from '../track'
import { baiduTranslate } from './baidu'
import { fetchAPI, fetchHTML } from './fetch'
import { queue, safe } from './utils'
import { ping, xhr, xhrCustom } from './xhr'

export {
  // track
  hm,
  ua,
  err,
  t,
  withT,

  // fetch
  fetchAPI,
  fetchHTML,

  // xhr
  xhr,
  xhrCustom,
  ping,

  // baidu
  baiduTranslate,

  // utils
  queue,
  safe
}

export default fetchAPI
