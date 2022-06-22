/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-21 15:20:10
 */
import { ViewStyle, ReactNode, Fn } from '@types'

export type Props = {
  style?: ViewStyle
  icon?: any
  left?: ReactNode
  right?: ReactNode
  children?: any
  onPress?: Fn
}
