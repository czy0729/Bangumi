/*
 * @Author: czy0729
 * @Date: 2022-06-13 10:29:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:20:15
 */
import type { TextStyle } from '@types'

export type Props = {
  /** 文字样式 */
  style?: TextStyle

  /** 文字大小 */
  size?: number

  /** 分数 */
  value?: number | string
}
