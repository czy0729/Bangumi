/*
 * @Author: czy0729
 * @Date: 2025-12-15 05:31:40
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-12-15 05:31:40
 */
import type { NodeItem } from '../../types'

export type RelationNode = NodeItem

export type RelationEdge = {
  src: string | number
  dst: string | number
  relate: string
}

export type RelationGraphData = {
  node: RelationNode[]
  relate: RelationEdge[]
}

export type RelationGraphProps = {
  data: RelationGraphData
  focusId: string | number
  maxRelations?: number
}

export type NodeLayout = {
  left: number
  right: number
  centerY: number
  height: number
}
