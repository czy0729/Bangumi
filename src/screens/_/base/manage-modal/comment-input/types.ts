/*
 * @Author: czy0729
 * @Date: 2025-10-21 13:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 06:37:47
 */
import type { InputInstance, InputProps } from '@components'

export type Props = {
  forwardRef: (ref: InputInstance | null) => void
  comment: string
  commentHistory: string[]
  onFocus: () => void
  onBlur: () => void
  onChangeText: InputProps['onChangeText']
  onShowHistory: () => Promise<void> | void
}
