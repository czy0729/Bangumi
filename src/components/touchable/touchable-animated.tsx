/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 22:08:11
 */
import React, { useRef, useCallback } from 'react'
import { View } from 'react-native'
import GenericTouchable, {
  TOUCHABLE_STATE
} from 'react-native-gesture-handler/src/components/touchables/GenericTouchable'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated'
import { useObserver } from 'mobx-react-lite'
import { stl } from '@utils'
import { separateStyles } from './utils'

const duration = 96

function TouchableAnimated({
  style,
  useRN,
  delayPressIn,
  delayPressOut,
  scale = 0.95,
  onPress,
  children,
  ...other
}) {
  const hitRef = useRef(false)
  const timeoutRef = useRef(null)

  const animatingRef = useRef(false)
  const animatedRef = useRef(false)
  const controlledRef = useRef(false)

  const scaleRef = useSharedValue(1)
  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(scaleRef.value === 1 ? 1 : 0.72, {
        duration,
        easing: Easing.linear
      }),
      transform: [
        {
          scale: withTiming(scaleRef.value, {
            duration,
            easing: Easing.linear
          })
        }
      ],
      overflow: 'hidden'
    }
  })

  const onAnimateStart = useCallback(() => {
    scaleRef.value = scale
    animatedRef.current = false
    animatingRef.current = true
  }, [scale, scaleRef])
  const onAnimateEnd = useCallback(() => {
    setTimeout(() => {
      scaleRef.value = 1
      animatedRef.current = true
      animatingRef.current = false
    }, duration + 16)
  }, [scaleRef])

  const onStateChange = useCallback(
    (_from: number, to: number) => {
      if (to === TOUCHABLE_STATE.BEGAN) {
        hitRef.current = true
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null
          if (!controlledRef.current && hitRef.current) onAnimateStart()
        }, 40)
      } else if (
        to === TOUCHABLE_STATE.UNDETERMINED ||
        to === TOUCHABLE_STATE.MOVED_OUTSIDE
      ) {
        hitRef.current = false
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        if (!controlledRef.current) onAnimateEnd()
      }
    },
    [onAnimateStart, onAnimateEnd]
  )

  const _onPress = useCallback(() => {
    // 保证 onPress 执行前至少进行过一次动画
    if (animatingRef.current) {
      if (typeof onPress === 'function') onPress()
      return
    }

    controlledRef.current = true
    onAnimateStart()
    setTimeout(() => {
      if (typeof onPress === 'function') onPress()
      onAnimateEnd()
      controlledRef.current = false
    }, duration + 16)
  }, [onAnimateStart, onAnimateEnd, onPress])

  return useObserver(() => {
    const _styles = separateStyles(style)
    return (
      <Animated.View style={stl(_styles.containerStyle, containerStyle)}>
        <GenericTouchable
          style={_styles.style}
          {...other}
          delayPressIn={40}
          onStateChange={onStateChange}
          onPress={_onPress}
        >
          <View>{children}</View>
        </GenericTouchable>
      </Animated.View>
    )
  })
}

export default TouchableAnimated
