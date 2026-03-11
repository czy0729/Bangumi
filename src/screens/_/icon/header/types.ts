/*
 * @Author: czy0729
 * @Date: 2022-10-18 15:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 05:56:35
 */
import type { ColorValue, IconfontNames, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  size?: number
  name?: IconfontNames
  color?: ColorValue
  shadow?: boolean
  children?: any
  onPress?: (event?: any) => any
}
