/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-11 21:45:11
 */
import { Fn, ReactNode, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  icon?: any
  left?: ReactNode
  right?: ReactNode
  splitStyles?: boolean
  children?: any
  onPress?: Fn
}
