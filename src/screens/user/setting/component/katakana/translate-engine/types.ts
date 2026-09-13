/*
 * @Author: czy0729
 * @Date: 2026-07-24 18:18:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 18:23:07
 */
import type { WithFilterProps } from '../../../types'

export type Props = WithFilterProps<{
  /** 传给 Input: 键盘弹出时把内容滚动到可视区 (与 @components Input 保持一致) */
  onScrollIntoViewIfNeeded: (deltaY: number) => void
}>
