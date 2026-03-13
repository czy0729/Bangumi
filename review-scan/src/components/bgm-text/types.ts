/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:40:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 10:13:21
 */
import { TextStyle } from '@types'

export type Props = {
  /** 图标当成文字一样使用 */
  style?: TextStyle

  /** 表情索引 */
  index?: number

  /** 大小 */
  size?: number

  /** 是否能被文字选中 */
  selectable?: boolean

  /** 行高 */
  lineHeight?: number

  children?: string
}
