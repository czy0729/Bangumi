/*
 * @Author: czy0729
 * @Date: 2022-11-04 11:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:12:26
 */
import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()
const margin = -Math.floor(_.window.height * _.device(_.ios(0.44, 0.38), 0.24))

export const Wrap = ({ focus, children }) => {
  const wrapStyle = useAnimatedStyle(() => ({
    marginTop: withTiming(focus ? margin : 0, {
      duration: 280
    })
  }))
  return <Animated.View style={wrapStyle}>{children}</Animated.View>
}
