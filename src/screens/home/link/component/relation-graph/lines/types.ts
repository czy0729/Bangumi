/*
 * @Author: czy0729
 * @Date: 2025-12-14 17:39:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-14 17:39:58
 *
 * 关系线类型
 */
import type { NodeLayout, RelationEdge } from '../types'

export type Props = {
  /** 渲染在哪一侧 */
  side: 'left' | 'right'

  /** 该侧的关联线 */
  relations: RelationEdge[]

  /** 节点布局缓存 (按节点 ID 索引) */
  layoutsRef: React.RefObject<Map<number, NodeLayout>>

  /** 当前激活的关联线 (点击后高亮) */
  activeRelation: RelationEdge | null

  /** 点击关联线回调 (高亮并滚动到目标节点) */
  handleRelationPress: (r: RelationEdge) => void
}
