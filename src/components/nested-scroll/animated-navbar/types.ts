/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:55:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-01 21:07:38
 */
import type { Animated } from 'react-native'

export type Props = {
  statusBarHeight: number
  headerHeight: number
  headerOpacity: Animated.AnimatedInterpolation<number>
  overflowHeaderOpacity: Animated.AnimatedInterpolation<number>
  OverflowHeaderComponent?: JSX.Element
  TopNavbarComponent?: JSX.Element
}
