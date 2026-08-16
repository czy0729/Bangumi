/*
 * @Author: czy0729
 * @Date: 2026-08-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 10:00:00
 */
import { getLineHeightCompensation } from './layout'

import type { TextLayoutLine } from 'react-native'

/**
 * 计算罗马音垂直位置 (iOS/默认)
 *  - 按字体度量锚定: 罗马音底边锚定在 cap 顶上方槽位处
 *  - 保留既有 iOS 观感, 勿改动
 */
export function computeRomajiTop(
  line: TextLayoutLine,
  size: number,
  baseSize: number,
  fullLineHeight: number
): number {
  return (
    line.y +
    line.ascender -
    line.capHeight -
    ((2 * line.ascender - line.descender - line.capHeight) * size) / baseSize -
    getLineHeightCompensation(line, fullLineHeight)
  )
}