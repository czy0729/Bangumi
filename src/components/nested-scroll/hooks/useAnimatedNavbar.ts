/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 15:45:21
 */
import type { Animated } from 'react-native'

/**
 * @fork https://github.com/kanelloc/react-native-animated-header-scroll-view/blob/main/src/hooks/useAnimateNavbar.ts
 * */
export const useAnimatedNavbar = (
  scroll: Animated.Value,
  imageHeight: number,
  headerHeight: number
) => {
  const HEADER_HEIGHT_DIFFERENCE = imageHeight - headerHeight
  const headerOpacity = scroll.interpolate({
    inputRange: [0, HEADER_HEIGHT_DIFFERENCE * 0.75, HEADER_HEIGHT_DIFFERENCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  })
  const overflowHeaderOpacity = scroll.interpolate({
    inputRange: [0, HEADER_HEIGHT_DIFFERENCE * 0.75, HEADER_HEIGHT_DIFFERENCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp'
  })

  return [headerOpacity, overflowHeaderOpacity]
}
