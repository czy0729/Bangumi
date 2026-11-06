/*
 * @Author: czy0729
 * @Date: 2026-11-06 18:08:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 *
 * Form 子组件 Props
 */
import type { InputProps } from '@components'

export type Props = {
  /** 是否展开资料表单 */
  expand: boolean

  /** 切换展开状态 */
  onExpand: () => void

  /** 输入框聚焦时滚动到可视区 */
  onScrollIntoViewIfNeeded: NonNullable<InputProps['onScrollIntoViewIfNeeded']>
}
