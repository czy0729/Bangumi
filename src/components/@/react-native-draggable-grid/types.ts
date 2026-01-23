/*
 * @Author: czy0729
 * @Date: 2026-01-23 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-23 01:56:50
 */
import type { PropsWithChildren } from 'react'
import type { GestureResponderHandlers } from 'react-native'
import type { ViewStyle } from '@types'

export type BlockProps = PropsWithChildren<{
  style?: ViewStyle
  dragStartAnimationStyle: ViewStyle
  panHandlers: GestureResponderHandlers
  delayLongPress: number
  onPress?: () => void
  onLongPress: () => void
}>
