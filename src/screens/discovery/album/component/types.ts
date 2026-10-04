/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找画集条目 Props (网格 / 列表布局共用)
 */
import type { WithIndex } from '@types'

export type Props = WithIndex<{
  /** otaStore.album 数据源排序下标 */
  pickIndex: number
}>
