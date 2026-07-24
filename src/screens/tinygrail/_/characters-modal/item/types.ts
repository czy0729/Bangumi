/*
 * @Author: czy0729
 * @Date: 2025-05-03 19:08:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 23:17:01
 */
import type { PickItem } from '../types'

export type Props = Pick<
  PickItem,
  'id' | 'level' | 'rank' | 'name' | 'assets' | 'sacrifices' | 'refine'
> & {
  type: string
  src?: string
  extra?: string
  disabled?: boolean
  item: PickItem
  onPress: (item: PickItem) => void
}
