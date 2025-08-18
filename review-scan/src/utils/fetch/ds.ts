/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 06:29:58
 */
import { HOST } from '@constants/constants'
import { WEB } from '@constants/device'

/** 开发显示请求信息 */
export const SHOW_LOG = true

/** API 超时时间 */
export const FETCH_TIMEOUT = 20000

/** GET 请求失败自动重试次数 */
export const FETCH_RETRY = WEB ? 0 : 2

/** 默认请求头 */
export const HEADERS_DEFAULT = {
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  Connection: 'keep-alive',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Referer: HOST
}
