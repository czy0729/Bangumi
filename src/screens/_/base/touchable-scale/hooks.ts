/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:26:33
 */
import { useCallback, useEffect, useRef } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { uiStore } from '@stores'
import { createPressController } from './utils'
import {
  PRESS_IN_SPRING,
  PRESS_OUT_SPRING,
  SCALE,
  TAP_DIP_DURATION,
  TAP_RESTORE_DURATION
} from './ds'

import type { GestureResponderEvent } from 'react-native'
import type { ViewStyle } from '@types'
import type { TouchablePressEvent } from '@components'
import type { PressController, UsePressScaleOptions } from './types'

/**
 * 按住缩放交互
 *  - 交互时序状态机在 utils (纯逻辑, 可单测), 这里只负责把 reanimated 动画与跳转接到状态机上
 *  - 控制器只创建一次 (内部持有计时器状态), 通过 ref 读取最新的 scale / onPress
 * */
export function usePressScale({
  scale = SCALE,
  onPress,
  onPressIn,
  onPressOut
}: UsePressScaleOptions = {}) {
  const value = useSharedValue(1)

  const scaleRef = useRef(scale)
  const onPressRef = useRef(onPress)
  const onPressInRef = useRef(onPressIn)
  const onPressOutRef = useRef(onPressOut)
  useEffect(() => {
    scaleRef.current = scale
    onPressRef.current = onPress
    onPressInRef.current = onPressIn
    onPressOutRef.current = onPressOut
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: value.value }]
  })) as ViewStyle

  const controllerRef = useRef<PressController | null>(null)
  if (!controllerRef.current) {
    controllerRef.current = createPressController({
      pressDown: () => {
        value.value = withSpring(scaleRef.current, PRESS_IN_SPRING)
      },
      springBack: () => {
        value.value = withSpring(1, PRESS_OUT_SPRING)
      },
      timedBack: () => {
        value.value = withTiming(1, {
          duration: TAP_RESTORE_DURATION,
          easing: Easing.out(Easing.quad)
        })
      },
      tapPulse: () => {
        value.value = withSequence(
          withTiming(scaleRef.current, {
            duration: TAP_DIP_DURATION,
            easing: Easing.out(Easing.quad)
          }),
          withTiming(1, {
            duration: TAP_RESTORE_DURATION,
            easing: Easing.inOut(Easing.quad)
          })
        )
      },
      commit: (evt?: TouchablePressEvent) => {
        if (typeof onPressRef.current === 'function') onPressRef.current(evt)
      },
      isScrolling: () => uiStore.isScrolling
    })
  }

  useEffect(
    () => () => {
      controllerRef.current?.dispose()
    },
    []
  )

  const handlePressIn = useCallback((evt: GestureResponderEvent) => {
    if (typeof onPressInRef.current === 'function') onPressInRef.current(evt)
    controllerRef.current?.pressIn()
  }, [])
  const handlePressOut = useCallback((evt: GestureResponderEvent) => {
    if (typeof onPressOutRef.current === 'function') onPressOutRef.current(evt)
    controllerRef.current?.pressOut()
  }, [])
  const handlePress = useCallback(
    (evt?: TouchablePressEvent) => controllerRef.current?.press(evt),
    []
  )

  return { animatedStyle, handlePressIn, handlePressOut, handlePress }
}
