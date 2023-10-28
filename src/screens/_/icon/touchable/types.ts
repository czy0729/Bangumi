/*
 * @Author: czy0729
 * @Date: 2022-10-18 16:34:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-28 10:57:16
 */
import { Insets } from 'react-native'
import { ColorValue, Fn, IconfontNames, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  name: IconfontNames
  size?: number
  color?: ColorValue
  count?: number | string
  withoutFeedback?: boolean
  hitSlop?: Insets
  children?: any
  onPress?: Fn
}
