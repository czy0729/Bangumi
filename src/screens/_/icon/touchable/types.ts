/*
 * @Author: czy0729
 * @Date: 2022-10-18 16:34:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-18 16:34:34
 */
import { ColorValue, Fn, IconfontNames, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  name: IconfontNames
  size?: number
  color?: ColorValue
  count?: number | string
  withoutFeedback?: boolean
  children?: any
  onPress?: Fn
}
