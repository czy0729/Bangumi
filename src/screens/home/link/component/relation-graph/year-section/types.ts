/*
 * @Author: czy0729
 * @Date: 2025-12-14 18:52:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-12-14 18:52:03
 */
import type { NodeLayout } from '../types'

export type Props = {
  year: string
  index: number
  nodes: { id: string | number }[]
  layoutsRef: React.RefObject<Map<number, NodeLayout>>
}
