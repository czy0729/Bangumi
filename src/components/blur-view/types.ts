/*
 * @Author: czy0729
 * @Date: 2022-08-31 19:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 02:32:16
 */
import { Expand, ViewStyle } from '@types'

export type Props = Expand<{
  style?: ViewStyle
  src?: string
  tint?: 'default' | 'extraLight' | 'light' | 'dark'

  /** iOS only */
  intensity?: number

  /** android only */
  blurRadius?: number
  cdn?: boolean
  children?: any
}>
