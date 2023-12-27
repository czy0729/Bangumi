/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:55:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 16:07:02
 */
import { Animated } from 'react-native'

export type Props = {
  scroll: Animated.Value
  OverflowHeaderComponent?: JSX.Element
  TopNavbarComponent?: JSX.Element
  imageHeight: number
  headerHeight: number
  statusBarHeight: number
}
