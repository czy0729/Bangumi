/*
 * @Author: czy0729
 * @Date: 2026-03-14 06:01:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 17:34:32
 */
import type { PropsWithChildren } from 'react'
import type { Animated } from 'react-native'

export type Props = PropsWithChildren<{
  /** 背景高度 */
  height: number

  /** 滚动偏移插值 */
  scroll: Animated.AnimatedInterpolation<number>
}>
