/*
 * @Author: czy0729
 * @Date: 2026-08-09 05:48:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-09 05:50:26
 */
import React, { memo } from 'react'
import { Dimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { MENU_ANIMATION_DURATION } from '../ds'
import { useHoldMenu } from '../context'
import { styles } from './styles'

const WINDOW_HEIGHT = Dimensions.get('window').height

/** 全屏遮罩, 点击关闭, 未展开时移到屏幕外并隐藏 */
function BackdropComponent() {
  const { active, theme, close } = useHoldMenu()

  const tapGesture = Gesture.Tap().onEnd(close)

  const animatedStyle = useAnimatedStyle(() => {
    const isActive = active.value === 1
    return {
      top: isActive ? 0 : WINDOW_HEIGHT,
      opacity: withTiming(isActive ? 1 : 0, {
        duration: MENU_ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic)
      }),
      backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'
    }
  }, [theme])

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View
        style={[styles.backdrop, animatedStyle]}
        accessible={false}
        importantForAccessibility='no'
      />
    </GestureDetector>
  )
}

const Backdrop = memo(BackdropComponent)

export default Backdrop
