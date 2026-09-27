/*
 * @Author: czy0729
 * @Date: 2025-12-15 05:13:23
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-12-15 05:13:23
 */
import type { ScrollView } from 'react-native'
import type { NodeLayout, RelationEdge, RelationNode } from '../types'

export type Props = {
  /** 条目节点 */
  item: RelationNode

  /** 焦点节点 ID */
  focusId: string | number

  /** 当前激活的关联线 (其目标节点高亮) */
  activeRelation: RelationEdge | null

  /** 节点布局缓存 (按节点 ID 索引) */
  layoutsRef: React.RefObject<Map<number, NodeLayout>>

  /** 节点布局测量回调 (onLayout, 内部带去重) */
  setLayout: (id: number, x: number, y: number, w: number, h: number) => void

  /** 切换焦点节点回调 */
  setFocusId: (id: number) => void

  /** 设置激活关联线回调 */
  setActiveRelation: (r: RelationEdge | null) => void

  /** 外层滚动视图引用 (关联线点击后滚动定位) */
  scrollViewRef: React.RefObject<ScrollView>

  /** 焦点节点的关联线 (用于判断与焦点相连的节点) */
  focusRelations: RelationEdge[]
}
