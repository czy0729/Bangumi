/*
 * @Author: czy0729
 * @Date: 2022-05-25 03:55:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 07:05:39
 */
import { STORYBOOK } from '@constants'
import { TextStyle } from '@types'
import { lineHeightRatio } from './layout'

/** 设置里动态调整的文字单位 */
export const fontSizeAdjust = 0

/** 计算动态文字大小 */
export function fontSize(pt: number, fontSizeAdjust: number = 0) {
  const fontSizeStyle: TextStyle = {
    fontSize: Math.floor(pt + Number(fontSizeAdjust)),
    lineHeight: Math.floor((pt + Number(fontSizeAdjust)) * lineHeightRatio)
  }
  if (pt >= 12 || !STORYBOOK) return fontSizeStyle

  fontSizeStyle.fontSize = 12
  fontSizeStyle.transform = [
    {
      scale: pt / 12
    }
  ]
  return fontSizeStyle
}
