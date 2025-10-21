/*
 * @Author: czy0729
 * @Date: 2025-10-21 15:32:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 15:34:42
 */
import type { Private } from '@types'

export type Props = {
  disabled: boolean
  privacy: Private
  onTogglePrivacy: () => void
  onSubmit: () => void
}
