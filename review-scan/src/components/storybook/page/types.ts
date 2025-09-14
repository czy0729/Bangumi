/*
 * @Author: czy0729
 * @Date: 2023-11-08 21:49:39
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-11-08 21:49:39
 */
import { ReactNode, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  container?: boolean
  wind?: boolean
  space?: boolean
  radius?: boolean
  children: ReactNode
}
