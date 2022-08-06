/*
 * 请求相关
 *
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 13:01:20
 */
import { hm, ua, err, t } from '../track'
import { fetchAPI, fetchHTML } from './fetch'
import { xhr, xhrCustom, ping } from './xhr'
import { baiduTranslate } from './baidu'
import { queue, safe } from './utils'

export {
  // track
  hm,
  ua,
  err,
  t,

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
