/*
 * @Author: czy0729
 * @Date: 2023-11-08 21:53:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 11:22:53
 */
import { Fn, ReactNode, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  contentContainerStyle?: ViewStyle
  scrollEnabled?: boolean
  inverted?: boolean
  onFooterRefresh?: Fn
  onScroll?: Fn
  children: ReactNode
}
