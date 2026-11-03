/*
 * @Author: czy0729
 * @Date: 2026-07-08 04:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 */
import type { LayoutChangeEvent } from 'react-native'
import type { PmDetailItem } from '@stores/user/types'

export type Props = {
  /** 线程标签数据 */
  item: PmDetailItem

  /** 是否高亮 */
  isHighlighted: boolean

  /** 高亮触发计数 */
  highlightTick: number

  /** 点击切换线程 */
  onPress?: () => void

  /** 标签位置变化 (用于线程间跳转) */
  onLayout?: (e: LayoutChangeEvent) => void
}
