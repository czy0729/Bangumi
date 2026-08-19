/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:30:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 10:30:00
 */
import { StyleSheet } from 'react-native'

import type { ViewStyle } from '@types'

/** 按设备获取标题对齐, 平板固定居中 */
export function getHeaderTitleAlign(
  headerTitleAlign: 'center' | 'left' | undefined,
  isPad: boolean
): 'center' | 'left' {
  return isPad ? 'center' : (headerTitleAlign ?? 'center')
}

/** 按设备获取标题容器样式, 平板追加右侧留白 */
export function getHeaderTitleStyle(
  headerTitleStyle: ViewStyle | undefined,
  isPad: boolean
): ViewStyle | undefined {
  return isPad ? StyleSheet.flatten([headerTitleStyle, { paddingRight: 0 }]) : headerTitleStyle
}
