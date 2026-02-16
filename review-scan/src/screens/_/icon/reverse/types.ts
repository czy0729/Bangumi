/*
 * @Author: czy0729
 * @Date: 2022-10-18 16:30:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-18 16:30:20
 */
import { ColorValue, Fn, TextStyle, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  iconStyle?: TextStyle
  color?: ColorValue
  size?: number
  children?: any
  onPress?: Fn
}
