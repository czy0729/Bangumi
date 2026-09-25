/*
 * @Author: czy0729
 * @Date: 2026-09-25 20:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-25 20:30:00
 */
import type { InputProps } from '@components'
import type { Keys, OriginItem } from '../../types'

export type Props = Omit<OriginItem, 'desc'> & {
  /** 源头类型 */
  type?: Keys

  /** 输入框聚焦时滚动到可视区 */
  onScrollIntoViewIfNeeded?: InputProps['onScrollIntoViewIfNeeded']
}
