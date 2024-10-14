/*
 * @Author: czy0729
 * @Date: 2022-06-13 12:34:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 16:34:11
 */
import { TextType } from '@components'
import { ColorValue, TextStyle, ViewStyle } from '@types'

export type Props = {
  /** 容器样式 */
  style?: ViewStyle

  /** 文字样式 */
  textStyle?: TextStyle

  /** 是否简单模式 */
  simple?: boolean

  /** 分数 */
  value?: number | string

  /** 字体大小 */
  size?: number

  /** 字体颜色 */
  type?: TextType

  /** 星星颜色 */
  color?: ColorValue
}
