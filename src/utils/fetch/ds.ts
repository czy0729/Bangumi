/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 23:07:50
 */
import { STORYBOOK } from '@constants/device'
import { HOST } from '@constants/constants'

/** 开发显示请求信息 */
export const SHOW_LOG = true

/** API 超时时间 */
export const FETCH_TIMEOUT = 6400

/** GET 请求失败自动重试次数 */
export const FETCH_RETRY = STORYBOOK ? 0 : 4

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
