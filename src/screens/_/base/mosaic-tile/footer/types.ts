/*
 * @Author: czy0729
 * @Date: 2026-11-05 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 热力图底部 Props
 */
import type { HeatmapType } from '@utils/kv/type'

export type Props = {
  /** 当前数据类型 */
  type: HeatmapType

  /** 是否正在拉取数据 */
  loading?: boolean

  /** 区间内的活动总数 */
  total: number

  /** 统计单位 (次活动 / 次动态 / 次贡献) */
  unit: string

  /** 切换数据类型, 不传则不显示入口 */
  onTypeChange?: (type: HeatmapType) => void
}
