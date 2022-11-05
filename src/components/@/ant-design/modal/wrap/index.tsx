/*
 * @Author: czy0729
 * @Date: 2022-11-04 11:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-05 23:08:04
 */
import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { _ } from '@stores'

const margin = -Math.floor(_.window.height * _.device(0.44, 0.24))

export const Wrap = ({ focus, children }) => {
  const wrapStyle = useAnimatedStyle(() => ({
    marginTop: withTiming(focus ? margin : 0, {
      duration: 200
    })
  }))
  return <Animated.View style={wrapStyle}>{children}</Animated.View>
}
