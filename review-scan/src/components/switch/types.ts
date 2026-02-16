/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:13:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-19 14:13:50
 */
import { ColorValue, ViewStyle, Fn } from '@types'

export type Props = {
  style?: ViewStyle
  checked?: boolean
  disabled?: boolean
  color?: ColorValue
  onChange?: Fn
}
