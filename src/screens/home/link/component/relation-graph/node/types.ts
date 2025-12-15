/*
 * @Author: czy0729
 * @Date: 2025-12-15 05:13:23
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-12-15 05:13:23
 */
import type { NodeLayout, RelationEdge, RelationNode } from '../types'

export type Props = {
  item: RelationNode
  focusId: string | number
  activeRelation: RelationEdge | null
  layoutsRef: React.RefObject<Map<number, NodeLayout>>
  setLayout: (id: number, x: number, y: number, w: number, h: number) => void
  setFocusId: (id: number) => void
  setActiveRelation: (r: RelationEdge | null) => void
  scrollViewRef: React.RefObject<any>
  focusRelations: RelationEdge[]
}
