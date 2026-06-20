/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-20 22:46:46
 */

/** 日志等级对应颜色 */
export const LEVEL_COLORS = {
  info: '#8ab4f8',
  success: '#81c995',
  warn: '#fdd663',
  error: '#f28b82'
} as const

/** 日志等级对应前缀 */
export const LEVEL_PREFIX = {
  info: 'I',
  success: '✓',
  warn: '!',
  error: '✗'
} as const
