/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:30:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 10:30:00
 */
import { StyleSheet } from 'react-native'
import { _ } from '@stores'

import type { ViewStyle } from '@types'
import type { StatusBarEventsType } from './types'

/** 渐显阈值 (px) */
export const HEADER_TRANSITION_HEIGHT = 32

/**
 * 计算滑动后头部是否需要固定
 *
 * @param y 当前滚动距离
 * @param fixed 当前固定状态
 * @returns 与当前状态一致时返回 null, 表示不需要 setState
 */
export function getHeaderFixed(y: number, fixed: boolean): boolean | null {
  if ((fixed && y > HEADER_TRANSITION_HEIGHT) || (!fixed && y <= HEADER_TRANSITION_HEIGHT)) {
    return null
  }

  return y > HEADER_TRANSITION_HEIGHT
}

/** 按设备获取标题对齐, 平板固定居中 */
export function getHeaderTitleAlign(
  headerTitleAlign: 'center' | 'left' | undefined,
  isPad: boolean
): 'center' | 'left' {
  return isPad ? 'center' : headerTitleAlign ?? 'center'
}

/** 按设备获取标题容器样式, 平板追加右侧留白 */
export function getHeaderTitleStyle(
  headerTitleStyle: ViewStyle | undefined,
  isPad: boolean
): ViewStyle | undefined {
  return isPad ? StyleSheet.flatten([headerTitleStyle, { paddingRight: 0 }]) : headerTitleStyle
}

type GetColor = (fixed: boolean) => string

/** 模式头部主题色映射, 决定返回按钮等元素颜色随 fixed 的亮暗切换 */
export const colors: Partial<Record<StatusBarEventsType, GetColor>> = {
  Subject: (fixed: boolean) => (_.isDark || !fixed ? '#fff' : '#000'),
  Tinygrail: () => _.colorTinygrailPlain
}
