/*
 * @Author: czy0729
 * @Date: 2022-08-11 12:07:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-15 11:06:21
 */
import { rc } from '@utils/dev'
import { HOST } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Image')

export const NAMESPACE = 'Component|Image|v2'

/** 默认请求头 */
export const DEFAULT_HEADERS = {
  Referer: `${HOST}/`
}

/** 渐出动画时长 */
export const IMAGE_FADE_DURATION = 320

/** 最大失败重试次数 */
export const MAX_ERROR_COUNT = 1

/** 重试间隔 */
export const RETRY_DISTANCE = 1000

/** bgm 封面域名 */
export const OSS_BGM = 'https://lain.bgm.tv'

/** magma 域名图片后缀 */
export const OSS_MEGMA_PREFIX = '/bgm_poster' // bgm_poster | bgm_thumb

/** bgm 没有做本地化的不常用表情 */
export const OSS_BGM_EMOJI_PREFIX = '/img/smiles/' // img/smiles/tv/14.gif | img/smiles/bgm/13.png

/** 451 错误标记, 用于忽略下次错误 */
export const CACHE_KEY_451 = `${NAMESPACE}|CACHE_ERROR_451` as const

/** 404 错误标记, 用于忽略下次错误 */
export const CACHE_KEY_404 = `${NAMESPACE}|CACHE_ERROR_404` as const

/** 超时错误标记, 用于忽略下次错误 */
export const CACHE_KEY_TIMEOUT = `${NAMESPACE}|CACHE_ERROR_TIMEOUT` as const
