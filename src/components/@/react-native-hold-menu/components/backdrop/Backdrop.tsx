/*
 * @Author: czy0729
 * @Date: 2024-02-19 10:52:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 06:15:34
 */
import React, { memo } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { BLURVIEW_TINT_LIGHT } from '../../../ds'
import { styles } from '../../components/backdrop/styles'
import { CONTEXT_MENU_STATE, HOLD_ITEM_TRANSFORM_DURATION, WINDOW_HEIGHT } from '../../constants'
import { useInternal } from '../../hooks'

export const BACKDROP_LIGHT_BACKGROUND_COLOR = 'rgba(0,0,0,0.1)'

export const BACKDROP_DARK_BACKGROUND_COLOR = 'rgba(0,0,0,0.5)'

const BackdropComponent = () => {
  const { state, theme } = useInternal()

  const tapGesture = Gesture.Tap().onEnd(() => {
    'worklet'
    if (state.value === CONTEXT_MENU_STATE.ACTIVE) {
      state.value = CONTEXT_MENU_STATE.END
    }
  })

  const animatedStyle = useAnimatedStyle(() => {
    'worklet'
    const isActive = state.value === CONTEXT_MENU_STATE.ACTIVE

    const animationConfig = {
      duration: HOLD_ITEM_TRANSFORM_DURATION,
      easing: Easing.out(Easing.cubic)
    }

    const backgroundColor =
      theme.value === BLURVIEW_TINT_LIGHT
        ? BACKDROP_LIGHT_BACKGROUND_COLOR
        : BACKDROP_DARK_BACKGROUND_COLOR

    return {
      top: isActive ? 0 : WINDOW_HEIGHT,
      opacity: withTiming(isActive ? 1 : 0, animationConfig),
      backgroundColor,
      pointerEvents: isActive ? 'auto' : 'none'
    }
  })

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={[styles.container, animatedStyle]}
        accessible={false}
        importantForAccessibility='no'
      />
    </GestureDetector>
  )
}

const Backdrop = memo(BackdropComponent)
export default Backdrop
