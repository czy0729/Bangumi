/*
 * @Author: czy0729
 * @Date: 2026-08-29 04:52:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-29 04:52:57
 */
import type { MilestoneItemData } from '../../types'

export type Props = {
  /** 列表条目（含预计算数据） */
  item: MilestoneItemData

  /** 索引 */
  index?: number
}
