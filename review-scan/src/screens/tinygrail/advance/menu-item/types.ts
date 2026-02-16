/*
 * @Author: czy0729
 * @Date: 2022-11-08 05:38:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 05:42:18
 */
import { AnyObject, IconfontNames, Navigation, Paths, ViewStyle } from '@types'

export type Props = {
  navigation: Navigation
  style?: ViewStyle
  pathname: Paths
  config?: AnyObject
  title: string
  icon: IconfontNames
}
