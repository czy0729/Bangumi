/*
 * @Author: czy0729
 * @Date: 2023-03-28 05:05:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:13:16
 */
import type { ViewStyle } from 'react-native'

export type Props<T = {}> = {
  /** 容器样式 */
  style?: ViewStyle

  /** 翻转高度 */
  height: number

  /** 翻转完成回调 */
  onAnimated?: () => void

  /** 翻转的子元素，会被 cloneElement 注入额外 props */
  children: React.ReactElement
} & T
