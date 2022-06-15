/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 15:32:57
 */
import { ViewStyle, IconfontNames, ReactNode, Fn } from '@types'

export type Props = {
  style?: ViewStyle
  icon?: IconfontNames
  left?: ReactNode
  right?: ReactNode
  children?: any
  onPress?: Fn
}
