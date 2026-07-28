/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:48:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 15:38:25
 */
import type { PropsWithChildren } from 'react'
import type { Animated, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native'
import type { NestedScrollEvent } from '@sdcx/nested-scroll'

export type Props = PropsWithChildren<{
  /** 头部高度 */
  height: number

  /** 顶部导航栏高度 */
  topBarHeight: number

  /** 滚动事件回调 */
  onScroll?: (event: NestedScrollEvent) => void

  /** 向上平移插值 */
  translateYUp: Animated.AnimatedInterpolation<number> | 0

  /** 向下平移插值 */
  translateYDown: Animated.AnimatedInterpolation<number> | 0

  /** 缩放插值 */
  scale: Animated.AnimatedInterpolation<number> | 1

  /** 图片样式 */
  imageStyle?: StyleProp<ImageStyle>

  /** 头部图片资源 */
  imageSource?: ImageSourcePropType

  /** 高斯模糊半径 */
  blurRadius?: number

  /** 导航栏透明度插值 */
  headerOpacity: Animated.AnimatedInterpolation<number>

  /** 溢出导航栏透明度插值 */
  overflowHeaderOpacity: Animated.AnimatedInterpolation<number>
}>
