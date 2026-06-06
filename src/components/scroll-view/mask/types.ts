/*
 * @Author: czy0729
 * @Date: 2026-06-06 16:46:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 16:52:28
 */
import type { PropsWithChildren } from 'react'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'

export type Props = PropsWithChildren<{
  leftMaskStyle: AnimatedStyle<ViewStyle>
  rightMaskStyle: AnimatedStyle<ViewStyle>
  maskColors: readonly [string, string]
  onLayout: (e: LayoutChangeEvent) => void
}>
