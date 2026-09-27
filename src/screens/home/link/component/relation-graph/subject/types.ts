/*
 * @Author: czy0729
 * @Date: 2025-12-16 15:43:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 15:44:17
 *
 * 节点卡片类型
 */
import type { RelationNode } from '../types'

export type Props = {
  /** 条目节点 */
  item: RelationNode

  /** 节点相对舞台的 y (用于滚动定位) */
  y: number

  /** 是否为焦点节点 */
  isFocus: boolean

  /** 是否为激活关联线的目标节点 */
  isActive: boolean
}
