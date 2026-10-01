/*
 * @Author: czy0729
 * @Date: 2026-09-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 00:00:00
 *
 * 找游戏条目 Props (网格 / 列表布局共用)
 */
import type { WithIndex } from '@types'

export type Props = WithIndex<{
  /** otaStore.game 数据源排序下标 */
  pickIndex: number
}>
