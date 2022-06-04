/*
 * @Author: czy0729
 * @Date: 2022-06-04 22:34:09
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-04 22:34:09
 */
import { ViewStyle, TextStyle, ColorValue } from '@types'
import { TextType } from '../text'

export type Props = {
  style?: ViewStyle
  styleExtra?: ViewStyle
  fontStyle?: TextStyle
  activeFontStyle?: TextStyle
  type?: TextType
  size?: number
  values?: string[]
  selectedIndex?: number
  enabled?: boolean
  tintColor?: ColorValue
  backgroundColor?: ColorValue
  onChange?: (event?: any) => any
  onValueChange?: (value?: any) => any
}
