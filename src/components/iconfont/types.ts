/*
 * @Author: czy0729
 * @Date: 2022-05-03 19:27:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 19:27:41
 */
import { ColorValue, TextStyle } from '@types'

export type Props = {
  /** 图标当成文字一样使用 */
  style?: TextStyle

  /** 图标名字，MaterialIcons系列用 'md-' 开头，iOS系列用 'ios-' 开头 */
  name: string

  /** 大小 */
  size?: number

  /** 行高 */
  lineHeight?: number

  /** 颜色 */
  color?: ColorValue
}
