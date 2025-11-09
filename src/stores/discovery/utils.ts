/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-08 21:28:25
 */
import type { Id } from '@types'

export function getInt(id: Id) {
  const str = String(id)
  return Number(str.slice(str.length - 2, str.length)) || 0
}

export function getBlogItemTime(str: string) {
  try {
    const temps = str
      .split('·')
      .map(item => item.trim())
      .filter(Boolean)
    if (temps.length) return temps[temps.length - 1]
  } catch (error) {}
  return ''
}
