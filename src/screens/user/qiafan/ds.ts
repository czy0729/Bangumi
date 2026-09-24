/*
 * @Author: czy0729
 * @Date: 2024-03-25 20:30:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
export const HM = ['qiafan', 'Qiafan'] as const

/** 正文行高: 约 1.6 倍字号, 大段中文更有呼吸感 */
export const FONT_BASE = {
  lineHeight: 22
} as const

/** 行内强调, 行高与正文一致避免跳行 */
export const FONT_STRONG = {
  lineHeight: 22,
  bold: true,
  underline: true
} as const

export const FONT_MAIN = {
  type: 'main',
  lineHeight: 22,
  bold: true
} as const
