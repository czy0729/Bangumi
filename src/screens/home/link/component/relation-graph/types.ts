/*
 * @Author: czy0729
 * @Date: 2025-12-15 05:31:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 22:43:27
 */
import type { ScrollEvent } from '@types'
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
  hideRelates?: string[]
  onScroll?: (evt: ScrollEvent) => void
}

export type NodeLayout = {
  left: number
  right: number
  centerY: number
  height: number
}
