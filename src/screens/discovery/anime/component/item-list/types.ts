/*
 * @Author: czy0729
 * @Date: 2025-11-04 16:19:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 列表布局条目类型
 */
import type { WithIndex } from '@types'

export type Props = WithIndex<{
  /** otaStore.anime 数据源排序下标 */
  pickIndex: number
}>
