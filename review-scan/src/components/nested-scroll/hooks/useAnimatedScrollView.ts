import { useRef } from 'react'
import { Animated } from 'react-native'
/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:45:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 16:14:49
 */
import { USE_NATIVE_DRIVER } from '@constants'

/**
 * @fork https://github.com/kanelloc/react-native-animated-header-scroll-view/blob/main/src/hooks/useAnimateScrollView.ts
 * */
export const useAnimateScrollView = (imageHeight: number, disableScale?: boolean) => {
  const scroll = useRef(new Animated.Value(0)).current

  const scale = scroll.interpolate({
    inputRange: [-imageHeight, 0, imageHeight],
    outputRange: [2.5, 1, 0.85],
    extrapolate: 'clamp'
  })

  const translateYDown = scroll.interpolate({
    inputRange: [-imageHeight, 0, imageHeight],
    outputRange: [-imageHeight * 0.6, 0, imageHeight * 0.5],
    extrapolate: 'clamp'
  })

  const translateYUp = scroll.interpolate({
    inputRange: [-imageHeight, 0, imageHeight],
    outputRange: [imageHeight * 0.3, 0, 0],
    extrapolate: 'clamp'
  })

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], {
    useNativeDriver: USE_NATIVE_DRIVER
  })

  return [
    scroll,
    onScroll,
    disableScale ? 1 : scale,
    disableScale ? 0 : translateYDown,
    disableScale ? 0 : translateYUp
  ] as const
}
