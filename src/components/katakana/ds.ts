/*
 * @Author: czy0729
 * @Date: 2022-08-12 11:47:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 09:07:39
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Katakana')

export const NAMESPACE = 'ComponentKatakana'

export const CACHE_KEY = `${NAMESPACE}|cache`

/** 开关开启时额外增加的行高 (为罗马音预留悬浮空间) */
export const LINE_HEIGHT_INCREASE = 5

/** 罗马音最小字号 */
export const SIZE_MIN = 8

/** 基底文本默认字号 */
export const SIZE_DEFAULT = 14

/** 罗马音相对基底文本减去的字号 */
export const SIZE_SUBTRACT = 6

/** 罗马音底部压入假名顶的深度 (Android 锚定行盒顶用) */
export const ROMAJI_OVERLAP = 3

/** 罗马音字符平均宽度估算系数 (水平布局重叠判定/贴边用) */
export const ROMAJI_WIDTH_RATIO = 0.55

/** 悬浮层翻译请求的防抖间隔 (毫秒) */
export const TRANSLATE_INTERVAL = 6400

/** 百度单次请求字符上限, 分批发送避免超限 */
export const BAIDU_BATCH_LIMIT = 1800
