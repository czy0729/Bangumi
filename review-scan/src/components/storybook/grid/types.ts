/*
 * @Author: czy0729
 * @Date: 2023-11-08 21:49:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 21:52:31
 */
import { ReactNode, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  wind?: boolean
  space?: boolean
  children: ReactNode
}
