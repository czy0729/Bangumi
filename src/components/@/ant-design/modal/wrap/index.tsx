/*
 * @Author: czy0729
 * @Date: 2022-11-04 11:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 04:55:43
 */
import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

function Wrap({ focus, children }) {
  const margin = -Math.floor(_.window.height * _.device(_.ios(0.44, 0.38), 0.24))
  const wrapStyle = useAnimatedStyle(() => ({
    marginTop: withTiming(focus ? margin : 0, {
      duration: 280
    })
  }))

  return <Animated.View style={wrapStyle}>{children}</Animated.View>
}

export default observer(Wrap)
