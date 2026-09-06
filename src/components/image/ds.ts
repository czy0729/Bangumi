/*
 * @Author: czy0729
 * @Date: 2022-08-11 12:07:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-06 20:20:51
 */
import { rc } from '@utils/dev'
import { HOST } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { Props as ImageProps } from './types'

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

/** magma CDN 探测超时, 超过则视为挂起直接回退 */
export const MAGMA_PROBE_TIMEOUT = 3000

/** magma 域名图片后缀 */
export const OSS_MEGMA_PREFIX = '/bgm_poster' // bgm_poster | bgm_thumb

/** bgm 没有做本地化的不常用表情 */
export const OSS_BGM_EMOJI_PREFIX = '/img/smiles/' // img/smiles/tv/14.gif | img/smiles/bgm/13.png

/** 451 错误标记, 用于忽略下次错误 */
export const CACHE_KEY_451 = `${NAMESPACE}|CACHE_ERROR_451` as const

/** 404 错误标记, 用于忽略下次错误 */
export const CACHE_KEY_404 = `${NAMESPACE}|CACHE_ERROR_404` as const

/** 透传给底层引擎的 props 黑名单 (安卓/Web 入口使用, iOS 入口为显式白名单) */
export const OMIT_KEYS: (keyof ImageProps)[] = [
  'style',
  'imageStyle',
  'src',
  'size',
  'height',
  'border',
  'borderWidth',
  'radius',
  'shadow',
  'placeholder',
  'autoSize',
  'autoHeight',
  'imageViewer',
  'imageViewerSrc',
  'withoutFeedback',
  'headers',
  'event',
  'delay',
  'scale',
  'cache',
  'fadeDuration',
  'errorToHide',
  'skeleton',
  'skeletonType',
  'textOnly',
  'priority',
  'onPress',
  'onLongPress',
  'onError'
]
