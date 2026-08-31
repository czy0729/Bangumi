/*
 * @Author: czy0729
 * @Date: 2026-07-25 20:09:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 20:09:39
 */
import type { TextStyle } from 'react-native'
import type { ButtonProps } from '@components'
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  styleText: TextStyle | false
  type?: ButtonProps['type']
  text: number
  onAnimated: () => void
}>
