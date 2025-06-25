/*
 * @Author: czy0729
 * @Date: 2025-06-19 14:59:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-25 22:21:49
 */
import { ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  size?: 'md' | 'sm' | 'xs'
  assets: number
  sacrifices: number
  refine?: number
  star?: boolean
}
