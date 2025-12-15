/*
 * @Author: czy0729
 * @Date: 2025-12-14 17:39:58
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-12-14 17:39:58
 */
import type { NodeLayout, RelationEdge } from '../types'

export type Props = {
  side: 'left' | 'right'
  relations: RelationEdge[]
  layoutsRef: React.RefObject<Map<number, NodeLayout>>
  activeRelation: RelationEdge | null
  handleRelationPress: (r: RelationEdge) => void
}
