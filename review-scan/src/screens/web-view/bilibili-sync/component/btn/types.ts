/*
 * @Author: czy0729
 * @Date: 2024-09-14 16:03:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 16:05:07
 */
import { Fn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  btnStyle?: ViewStyle
  text?: string
  type?: string
  size?: number
  disabled?: boolean
  loading?: boolean
  onPress?: Fn
}
