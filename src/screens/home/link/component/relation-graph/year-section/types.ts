/*
 * @Author: czy0729
 * @Date: 2025-12-14 18:52:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-14 18:52:03
 *
 * 年份背景类型
 */
import type { NodeLayout } from '../types'

export type Props = {
  /** 年份 (无日期节点为'未知') */
  year: string

  /** 分组序号 (用于交替背景色) */
  index: number

  /** 该年份下的节点 */
  nodes: { id: string | number }[]

  /** 节点布局缓存 (按节点 ID 索引) */
  layoutsRef: React.RefObject<Map<number, NodeLayout>>
}
