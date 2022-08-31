/*
 * @Author: czy0729
 * @Date: 2022-08-31 19:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 19:32:10
 */
import { Expand, ViewStyle } from '@types'

export type Props = Expand<{
  style?: ViewStyle
  src?: string
  tint?: 'default' | 'light' | 'dark'

  /** iOS only */
  intensity?: number

  /** android only */
  blurRadius?: number
  children?: any
}>
