/*
 * @Author: czy0729
 * @Date: 2022-10-18 16:34:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 10:01:10
 */
import type { Insets } from 'react-native'
import type { ColorValue, Fn, IconfontNames, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  name: IconfontNames
  size?: number
  color?: ColorValue
  shadow?: boolean
  count?: number | string
  withoutFeedback?: boolean
  hitSlop?: Insets
  children?: any
  onPress?: Fn
}
