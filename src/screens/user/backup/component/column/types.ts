/*
 * @Author: czy0729
 * @Date: 2026-07-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-02 10:00:00
 */
import type { TextProps } from '@components'
import type { ReactNode, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  show?: boolean
  type?: TextProps['type']
  text?: string
  right?: ReactNode
  onPress?: () => void
}>
