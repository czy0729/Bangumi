/*
 * @Author: czy0729
 * @Date: 2022-08-11 12:07:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 12:08:10
 */
import { HOST } from '@constants'

/** 默认请求头 */
export const DEFAULT_HEADERS = {
  Referer: `${HOST}/`
}

/** 最大失败重试次数 */
export const MAX_ERROR_COUNT = 1

/** 重试间隔 */
export const RETRY_DISTANCE = 1000

/** bgm 封面域名 */
export const OSS_BGM = 'https://lain.bgm.tv'

/** magma 域名图片后缀 */
export const OSS_MEGMA_PREFIX = '/bgm_poster'
