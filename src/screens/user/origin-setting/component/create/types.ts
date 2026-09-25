/*
 * @Author: czy0729
 * @Date: 2026-09-25 20:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-25 20:30:00
 */
import type { Keys } from '../../types'

export type Props = {
  /** 源头类型 */
  type: Keys

  /** 分类名称 */
  name: string

  /** 输入框聚焦时滚动到可视区 */
  onScrollIntoViewIfNeeded: (deltaY: number) => void
}
