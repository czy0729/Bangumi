/*
 * @Author: czy0729
 * @Date: 2022-06-04 22:34:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 04:38:11
 */
import type { ColorValue, DataSource, TextStyle, ViewStyle, WithViewStyles } from '@types'
import type { TextType } from '../text'

export type Props<T extends DataSource> = WithViewStyles<{
  styleExtra?: ViewStyle
  fontStyle?: TextStyle
  activeFontStyle?: TextStyle
  type?: TextType
  size?: number
  values?: T
  selectedIndex?: number
  enabled?: boolean
  tintColor?: ColorValue
  backgroundColor?: ColorValue
  onChange?: (event?: any) => any
  onValueChange?: (value?: T[number]) => any
}>
