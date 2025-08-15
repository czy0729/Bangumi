/*
 * @Author: czy0729
 * @Date: 2024-03-04 18:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 18:36:06
 */
import { IconfontNames, Paths, ReactNode, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  index: number
  iconStyle?: ViewStyle
  pathname: Paths
  config?: {
    type: string
  }
  title: ReactNode
  icon: IconfontNames
}
