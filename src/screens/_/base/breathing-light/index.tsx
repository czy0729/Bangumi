/*
 * @Author: czy0729
 * @Date: 2026-04-21 21:23:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 14:50:35
 */
import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as BreathingLightProps } from './types'

export const BreathingLight = observer(({ style, color, running = true }: BreathingLightProps) => {
  r(COMPONENT)

  const opacity = useSharedValue(0.6)
  const scale = useSharedValue(1)

  useEffect(() => {
    if (running) {
      // 启动动画
      opacity.value = withRepeat(
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      )
      scale.value = withRepeat(
        withTiming(1.28, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      )
    } else {
      cancelAnimation(opacity)
      cancelAnimation(scale)

      opacity.value = withTiming(0.6, { duration: 300 })
      scale.value = withTiming(1, { duration: 300 })
    }

    return () => {
      cancelAnimation(opacity)
      cancelAnimation(scale)
    }
  }, [opacity, running, scale])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }))

  const styles = memoStyles()

  let colorValue = color
  if (colorValue === undefined) {
    const { status } = systemStore.serverStatus
    if (status === 'ok') {
      colorValue = _.colorSuccess
    } else if (status === 'degraded') {
      colorValue = _.colorWarning
    } else if (status === 'down') {
      colorValue = _.colorDanger
    } else {
      colorValue = _.colorIcon
    }
  }

  return (
    <View style={stl(styles.container, style)}>
      <Animated.View
        style={stl(styles.dot, animatedStyle, {
          backgroundColor: colorValue,
          shadowColor: colorValue
        })}
      />
      <View
        style={stl(styles.staticHalo, {
          backgroundColor: colorValue
        })}
      />
    </View>
  )
})

export default BreathingLight
