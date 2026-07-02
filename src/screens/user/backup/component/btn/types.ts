/*
 * @Author: czy0729
 * @Date: 2026-07-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-02 10:00:00
 */
import type { ViewStyle, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  btnStyle?: ViewStyle
  text?: string
  type?: 'success'
  size?: number
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
}>
