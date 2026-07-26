/*
 * @Author: czy0729
 * @Date: 2026-06-06 16:46:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 05:08:26
 */
import type { PropsWithChildren } from 'react'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'

export type Props = PropsWithChildren<{
  /** 是否显示遮罩 */
  showMask?: boolean

  /** 遮罩宽度 */
  maskWidth?: number

  /** 左侧遮罩动画样式 */
  leftMaskStyle: AnimatedStyle<ViewStyle>

  /** 右侧遮罩动画样式 */
  rightMaskStyle: AnimatedStyle<ViewStyle>

  /** 遮罩渐变色 [左, 中, 右] */
  maskColors: readonly [string, string, string]

  /** 布局回调 */
  onLayout: (e: LayoutChangeEvent) => void
}>
