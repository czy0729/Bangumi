/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:55:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 16:10:38
 */
import type { Animated } from 'react-native'
import type { OverflowComponents } from '../types'

export type Props = {
  /** 状态栏高度 */
  statusBarHeight: number

  /** 导航栏高度 */
  headerHeight: number

  /** 导航栏透明度插值 */
  headerOpacity: Animated.AnimatedInterpolation<number>

  /** 溢出导航栏透明度插值 */
  overflowHeaderOpacity: Animated.AnimatedInterpolation<number>
} & OverflowComponents
