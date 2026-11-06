/*
 * @Author: czy0729
 * @Date: 2026-11-06 18:08:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 *
 * Scroll 子组件 Props
 */
import type { InputProps, ScrollViewProps } from '@components'

export type Props = Required<Pick<ScrollViewProps, 'forwardRef' | 'onScroll'>> & {
  /** 输入框聚焦时滚动到可视区 */
  onScrollIntoViewIfNeeded: NonNullable<InputProps['onScrollIntoViewIfNeeded']>

  /** 刷新 */
  onRefresh: () => void
}
