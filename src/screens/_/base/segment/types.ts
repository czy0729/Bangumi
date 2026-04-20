/*
 * @Author: czy0729
 * @Date: 2026-04-20 20:55:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 21:11:05
 */
import type { WithViewStyles } from '@types'

export type Props<T extends string> = WithViewStyles<{
  data: readonly T[]
  selectedIndex: number
  onSelect: (label: T) => void
}>
