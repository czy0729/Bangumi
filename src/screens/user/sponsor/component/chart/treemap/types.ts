/*
 * @Author: czy0729
 * @Date: 2022-09-07 03:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * treemap 网格 Props
 */
import type { LayoutChangeEvent } from 'react-native'
import type { TreemapNode } from '../../../types'

export type Props = {
  /** 排布后的节点 */
  data: TreemapNode[]

  /** 容器尺寸已测量, 未测量前不排布 */
  measured: boolean

  /** 自己的 key, 空字符串为自己未上榜 */
  myData: string

  /** 容器布局测量 */
  onLayout: (event: LayoutChangeEvent) => void

  /** 点击隐藏该格 */
  onPress: (id: string) => void

  /** 长按进入空间, 仅支持者可用 */
  onLongPress?: (id: string) => void

  /** 重置全部隐藏 */
  onReset: () => void
}
