/*
 * @Author: czy0729
 * @Date: 2026-08-19 07:38:18
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 07:38:18
 */
import type { IconFamily } from './types'

/** 根据图标名判定所属图标家族 */
export function getIconFamily(name: string): IconFamily {
  if (name.startsWith('md-')) return 'material'
  if (name.startsWith('ios-')) return 'ionicons'
  return 'app'
}

/** 归一化 App 图标名（自动补 icon- 前缀） */
export function getAppIconName(name: string): string {
  return name.includes('icon') ? name : `icon-${name}`
}
