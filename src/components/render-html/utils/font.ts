/*
 * @Author: czy0729
 * @Date: 2026-09-07 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 03:00:00
 *
 * 字体样式: 基础样式修正、字符串样式转 RN 样式、平板字号行高补偿
 */
import { _ } from '@stores'
import { PAD_FONT_ZISE_INCREASE, PAD_LINE_HEIGHT_INCREASE } from '../ds'

import type { TextStyle } from '@types'

/** 获取最后字体渲染基本样式 */
export function fixedBaseFontStyle(baseFontStyle: TextStyle = {}) {
  const style = _.flatten(baseFontStyle) || {}
  if (!_.isPad) return style

  const fixedStyle = { ...style }
  if (fixedStyle.fontSize) fixedStyle.fontSize += PAD_FONT_ZISE_INCREASE
  if (fixedStyle.lineHeight) fixedStyle.lineHeight += PAD_LINE_HEIGHT_INCREASE

  return fixedStyle
}

/** 字符串样式转换成 RN 样式 */
export function formatStyles(styleStr: string) {
  const rnStyle: Record<string, string | number> = {}
  if (!styleStr) return rnStyle

  styleStr.split(';').forEach(item => {
    const [key, value] = item.split(':')
    if (key && value) {
      const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase())
      const rawValue = value.trim().replace('px', '')
      const numValue = Number(rawValue)
      rnStyle[camelKey] = isNaN(numValue) ? rawValue : numValue
    }
  })
  return rnStyle
}

/** 获取最后字体渲染字号大小 */
export function getIncreaseFontSize(fontSize: number) {
  if (!fontSize || !_.isPad) return fontSize
  return Number(fontSize) + PAD_FONT_ZISE_INCREASE
}

/** 获取最后字体渲染行高大小 */
export function getIncreaseLineHeight(lineHeight: number) {
  if (!lineHeight || !_.isPad) return lineHeight
  return Number(lineHeight) + PAD_LINE_HEIGHT_INCREASE
}
