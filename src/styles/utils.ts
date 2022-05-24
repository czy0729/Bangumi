/*
 * @Author: czy0729
 * @Date: 2022-05-25 03:55:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 04:07:21
 */
import { lineHeightRatio } from './layout'

/** 设置里动态调整的文字单位 */
export const fontSizeAdjust = 0

/** 计算动态文字大小 */
export function fontSize(pt: number, fontSizeAdjust = 0) {
  return {
    fontSize: Math.floor(pt + fontSizeAdjust),
    lineHeight: Math.floor((pt + fontSizeAdjust) * lineHeightRatio)
  }
}
