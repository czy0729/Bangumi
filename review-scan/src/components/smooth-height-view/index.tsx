/*
 * @Author: czy0729
 * @Date: 2025-02-16 12:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 12:38:23
 */
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

export const SmoothHeightView = ({ minHeight, children }) => {
  const height = useSharedValue(minHeight)
  const [contentHeight, setContentHeight] = useState(minHeight)

  // 动态高度样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      overflow: 'hidden'
    }
  })

  // 当内容高度变化时，触发动画
  useEffect(() => {
    if (contentHeight > minHeight) {
      height.value = withTiming(contentHeight, {
        duration: 300,
        easing: Easing.inOut(Easing.ease)
      })
    } else {
      height.value = withTiming(minHeight, {
        duration: 300,
        easing: Easing.inOut(Easing.ease)
      })
    }
  }, [contentHeight, height, minHeight])

  return (
    <Animated.View style={animatedStyle}>
      <View
        onLayout={event => {
          const { height } = event.nativeEvent.layout
          setContentHeight(height)
        }}
      >
        {children}
      </View>
    </Animated.View>
  )
}
