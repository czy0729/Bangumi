/*
 * 请求相关
 * @Author: czy0729
 * @Date: 2019-03-14 05:08:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 14:46:25
 */
import { err, hm, t, ua, withT } from '../track'
import { baiduTranslate } from './baidu'
import { fetchAPI, fetchHTML } from './fetch'
import { queue, safe } from './utils'
import { ping, xhr, xhrCustom } from './xhr'

export {
  baiduTranslate,
  err,
  fetchAPI,
  fetchHTML,
  hm,
  ping,
  queue,
  safe,
  t,
  ua,
  withT,
  xhr,
  xhrCustom
}

export default fetchAPI
