/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:11:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:11:29
 *
 * 封面尺寸
 */
import { RATIO } from '../device'

/** 封面尺寸 */
const h = (w: number) => Math.floor(w * 1.4)

/** 封面宽度 */
export const IMG_WIDTH = Math.floor(RATIO * 82)

/** 封面高度 */
export const IMG_HEIGHT = h(IMG_WIDTH)

/** 封面宽度 (小) */
export const IMG_WIDTH_SM = Math.floor(RATIO * 72)

/** 封面高度 (小) */
export const IMG_HEIGHT_SM = h(IMG_WIDTH_SM)

/** 封面宽度 (大) */
export const IMG_WIDTH_LG = Math.floor(IMG_WIDTH * 1.34)

/** 封面高度 (大) */
export const IMG_HEIGHT_LG = h(IMG_WIDTH_LG)
