/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:48:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 15:50:25
 */
import { PropsWithChildren } from 'react'
import { Animated, ImageStyle, StyleProp } from 'react-native'

export type Props = PropsWithChildren<{
  imageHeight: number
  topBarHeight: number
  onScroll?: (event: any) => void
  translateYUp: Animated.AnimatedInterpolation<number> | 0
  translateYDown: Animated.AnimatedInterpolation<number> | 0
  scale: Animated.AnimatedInterpolation<number> | 1
  imageStyle?: StyleProp<ImageStyle>
  imageSource: any
  blurRadius?: number
  headerOpacity: Animated.AnimatedInterpolation<number>
  overflowHeaderOpacity: Animated.AnimatedInterpolation<number>
}>
