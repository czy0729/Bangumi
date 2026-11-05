/*
 * @Author: czy0729
 * @Date: 2026-11-05 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 热力图网格 Props
 */
import type { MosaicTileType } from '../types'

export type Props = {
  /** 格子日期, 从最近到最早 */
  days: string[]

  /** 每个月首次出现的列下标 */
  monthColumns: Record<number, number>

  /** 日期 -> 次数 */
  mosaicTile: MosaicTileType

  /** 今天 (Y-m-d) */
  todayStr: string

  /** 统计单位 (次活动 / 次动态 / 次贡献) */
  unit: string
}
