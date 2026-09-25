/*
 * @Author: czy0729
 * @Date: 2022-09-07 03:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 13:51:27
 */
import type { LayoutChangeEvent } from 'react-native'
import type { TreemapNode } from '../../../types'

export type Props = {
  data: TreemapNode[]

  /** 容器尺寸已测量, 未测量前不排布 */
  measured: boolean

  isDark: boolean

  /** 自己的 key, 空字符串为自己未上榜 */
  myData: string

  onLayout: (event: LayoutChangeEvent) => void
  onPress: (id: string) => void
  onLongPress?: (id: string) => void
  onReset: () => void
}
