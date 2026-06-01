/*
 * @Author: czy0729
 * @Date: 2026-06-02 02:05:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 02:05:00
 */
import type { ReactNode } from 'react'

export type Props = {
  value: string
  placeholder: string
  locked: boolean
  focused: boolean
  onChangeText: (text: string) => void
  onFocus: () => void
  onBlur: () => void
  onToggleLock: () => void
  extra?: ReactNode
}
