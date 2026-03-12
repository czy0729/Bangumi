/*
 * @Author: czy0729
 * @Date: 2026-03-10 07:47:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 09:57:25
 */
import React, { useEffect } from 'react'
import Animated, {
  clamp,
  Easing,
  SensorType,
  useAnimatedReaction,
  useAnimatedSensor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { stl } from '@utils'
import { useAppState, useIsFocused } from '@utils/hooks'
import { styles } from './styles'

import type { Props as SensorParallaxCardProps } from './types'
export type { SensorParallaxCardProps }

/** 重力视差容器 */
export function SensorParallaxCard({
  style,
  sensitivity = 0.6,
  enabled = true,
  reverse = false,
  enableRotate = true,
  children
}: SensorParallaxCardProps) {
  const isFoucs = useIsFocused()
  const isActive = useAppState()

  const sensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 'auto',
    adjustToInterfaceOrientation: true
  })
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)
  const rotateEnabled = useSharedValue(enableRotate)

  useEffect(() => {
    rotateEnabled.value = enableRotate
  }, [enableRotate, rotateEnabled])

  const RESTORING_FORCE = 0.005
  const ROTATE_FACTOR = 0.2

  useAnimatedReaction(
    () => sensor.sensor.value,
    data => {
      if (!(isFoucs && isActive)) return

      if (enabled) {
        const direction = reverse ? -1 : 1

        translateX.value -= data.y * sensitivity * direction
        translateY.value += data.x * sensitivity * direction

        if (rotateEnabled.value) {
          rotateX.value += data.x * ROTATE_FACTOR
          rotateY.value += data.y * ROTATE_FACTOR
        } else {
          rotateX.value = withTiming(0, { duration: 300 })
          rotateY.value = withTiming(0, { duration: 300 })
        }

        translateX.value -= translateX.value * RESTORING_FORCE
        translateY.value -= translateY.value * RESTORING_FORCE
        rotateX.value -= rotateX.value * RESTORING_FORCE
        rotateY.value -= rotateY.value * RESTORING_FORCE
      } else {
        translateX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) })
        translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) })
        rotateX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) })
        rotateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) })
      }
    }
  )

  const animatedStyle = useAnimatedStyle(() => {
    const tX = clamp(translateX.value, -50, 50)
    const tY = clamp(translateY.value, -50, 50)
    const rX = clamp(rotateX.value, -6, 6)
    const rY = clamp(rotateY.value, -6, 6)

    return {
      transform: [
        { perspective: rotateEnabled.value ? 600 : 3000 },
        { rotateX: `${rX}deg` },
        { rotateY: `${rY}deg` },
        { translateX: tX },
        { translateY: tY }
      ]
    } as const
  })

  return (
    <Animated.View
      style={stl(enableRotate && styles.scale, animatedStyle, style)}
      renderToHardwareTextureAndroid
    >
      {children}
    </Animated.View>
  )
}
