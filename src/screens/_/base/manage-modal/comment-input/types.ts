/*
 * @Author: czy0729
 * @Date: 2025-10-21 13:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 13:41:16
 */
import type { InputInstance, InputProps } from '@components'

export type Props = {
  forwardRef: (ref: InputInstance) => any
  comment: string
  commentHistory: string[]
  onFocus: () => any
  onBlur: () => any
  onChangeText: InputProps['onChangeText']
  onShowHistory: () => any
}
