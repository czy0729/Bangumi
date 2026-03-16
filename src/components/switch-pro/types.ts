/*
 * @Author: czy0729
 * @Date: 2026-03-17 04:06:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 04:09:27
 */
import type { ColorValue, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  value: boolean
  backgroundActive?: ColorValue
  backgroundInactive?: ColorValue
  onSyncPress?: () => void
  onAsyncPress?: () => void
}>
