/*
 * @Author: czy0729
 * @Date: 2025-12-15 05:31:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 22:43:27
 *
 * 关系图类型
 */
import type { ScrollEvent } from '@types'
import type { NodeItem } from '../../types'

export type RelationNode = NodeItem

/** 关联线 (节点间的有向关系) */
export type RelationEdge = {
  /** 起始节点 ID */
  src: string | number

  /** 目标节点 ID */
  dst: string | number

  /** 关系描述 (如续作、前传) */
  relate: string
}

/** 关系图数据结构 */
export type RelationGraphData = {
  /** 全部节点 */
  node: RelationNode[]

  /** 全部关联线 */
  relate: RelationEdge[]
}

export type RelationGraphProps = {
  /** 关系图数据 */
  data: RelationGraphData

  /** 焦点节点 ID (页面对应的条目) */
  focusId: string | number

  /** 焦点关联线渲染上限 */
  maxRelations?: number

  /** 隐藏的关系类型 */
  hideRelates?: string[]

  /** 滚动回调 (用于维护可视范围底部 y) */
  onScroll?: (evt: ScrollEvent) => void
}

/** 节点测量后的布局信息 (相对图谱舞台) */
export type NodeLayout = {
  /** 左边缘 x */
  left: number

  /** 右边缘 x */
  right: number

  /** 垂直中心 y */
  centerY: number

  /** 高度 */
  height: number
}
