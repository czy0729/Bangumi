/*
 * @Author: czy0729
 * @Date: 2026-11-08 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 表情列表: 600 号起为新表情, 使用大字号展示
 */
import { BGM_MAP } from '@components'

export const SIZE = {
  normal: 24,
  large: 40
} as const

export const ITEMS = Object.keys(BGM_MAP).map(key => {
  const index = Number(key)
  return {
    index,
    size: index >= 600 ? SIZE.large : SIZE.normal
  }
})
