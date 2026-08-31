/*
 * @Author: czy0729
 * @Date: 2023-11-08 21:53:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 16:58:13
 */
import type { ReactNode, ScrollEvent, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  contentContainerStyle?: ViewStyle
  scrollEnabled?: boolean
  inverted?: boolean
  onFooterRefresh?: () => void
  onScroll?: (e: ScrollEvent) => void
  children: ReactNode
}
