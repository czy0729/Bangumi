/*
 * @Author: czy0729
 * @Date: 2022-10-18 16:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-22 12:41:08
 */
import { ColorValue, Fn, IconfontNames, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  name?: IconfontNames
  text?: string
  size?: number
  color?: ColorValue
  position?: 'left' | 'right'
  children?: any
  onPress?: Fn
}
