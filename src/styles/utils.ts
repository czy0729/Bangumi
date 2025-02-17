/*
 * @Author: czy0729
 * @Date: 2022-05-25 03:55:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:50:17
 */
import { WEB } from '@constants/device'
import { lineHeightRatio } from './layout'

/** 设置里动态调整的文字单位 */
export const fontSizeAdjust = 0

/**
 * 计算动态文字大小
 * @param pt
 * @param fontSizeAdjust
 * @param transform 浏览器限制最小为 12px, 开启后强制使用 transform 缩放文字大小
 * @returns
 */
export function fontSize(pt: number, fontSizeAdjust: number = 0, transform: boolean = false) {
  if (WEB) {
    if (pt < 12) {
      if (transform) {
        const scale = pt / (12 - 1)
        return {
          marginRight: -((1 - scale) * 12),
          fontSize: 12,
          lineHeight: 12,
          transform: [
            {
              scale
            }
          ],
          transformOrigin: 'left center'
        }
      } else {
        pt = 12
      }
    }
  }

  const calc = Math[WEB ? 'ceil' : 'floor']
  return {
    fontSize: calc(pt + Number(fontSizeAdjust)),
    lineHeight: calc((pt + Number(fontSizeAdjust)) * lineHeightRatio)
  }
}
