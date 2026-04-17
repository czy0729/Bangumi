/*
 * @Author: czy0729
 * @Date: 2026-01-23 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 10:49:04
 */
import type { SharedValue } from 'react-native-reanimated'

export type BaseItem = {
  key: string | number
  disabledDrag?: boolean
}

export type BlockProps = {
  id: string
  positions: SharedValue<Record<string, number>>
  blockWidth: number
  blockHeight: number
  numColumns: number
  children: React.ReactNode
  onDragEnd: (finalPositions: Record<string, number>) => void
  disabled?: boolean
}

export type Props<T> = {
  data: T[]
  numColumns: number
  renderItem: (item: T, index: number) => React.ReactElement
  onDragRelease?: (newData: T[]) => void
  itemHeight?: number
}
