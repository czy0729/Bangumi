/*
 * @Author: czy0729
 * @Date: 2023-11-08 21:49:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 04:18:44
 */
import type { ReactNode, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  wind?: boolean
  space?: boolean
  justify?: 'start' | 'end' | 'center' | 'between' | 'around'
  children: ReactNode
}
