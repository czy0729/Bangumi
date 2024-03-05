/*
 * @Author: czy0729
 * @Date: 2022-08-11 12:07:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:27:03
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { EVENT, HOST, STORYBOOK, TEXT_ONLY } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Image')

/** 默认请求头 */
export const DEFAULT_HEADERS = {
  Referer: `${HOST}/`
}

/** 默认参数 */
export const DEFAULT_PROPS = {
  style: undefined,
  imageStyle: undefined,
  autoSize: 0,
  border: false,
  borderWidth: _.hairlineWidth,
  cache: !STORYBOOK,
  delay: !STORYBOOK,
  event: EVENT,
  headers: undefined,
  height: undefined,
  imageViewer: false,
  imageViewerSrc: undefined,
  withoutFeedback: false,
  placeholder: true,
  quality: true,
  radius: undefined,
  shadow: false,
  size: 40,
  src: undefined,
  textOnly: TEXT_ONLY,
  skeleton: true,
  onPress: undefined,
  onLongPress: undefined,
  onError: undefined
}

/** 渐出动画时长 */
export const IMAGE_FADE_DURATION = 400

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
