/*
 * @Author: czy0729
 * @Date: 2026-08-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 10:00:00
 */
import { ROMAJI_OVERLAP } from '../ds'
import { getLineHeightCompensation } from './layout'

import type { TextLayoutLine } from 'react-native'

/**
 * 计算罗马音垂直位置 (Android)
 *  - Android 的 ascender/descender 随行内字形变化而逐行漂移, capHeight 为全局常量,
 *    旧公式锚定会漂移导致罗马音被文字遮盖; 改为锚定稳定的行盒顶 line.y (= 假名顶)
 *  - 与 iOS 公式严格隔离, 不影响 iOS
 */
export function computeRomajiTop(
  line: TextLayoutLine,
  size: number,
  _baseSize: number,
  fullLineHeight: number
): number {
  return (
    line.y + ROMAJI_OVERLAP - size - getLineHeightCompensation(line, fullLineHeight)
  )
}