/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 17:51:06
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
import { useObserver } from 'mobx-react'
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
  /** 防止快速滑动时触摸到减少缩放的标志 */
  const hitRef = useRef(false)

  /** 动画准备开始的标志 */
  const timeoutStartRef = useRef(null)

  /** 动画主动取消的标志 */
  const timeoutCancelRef = useRef(null)

  /** 动画进行中 */
  const animatingRef = useRef(false)

  /** 动画进行完毕 */
  const animatedRef = useRef(false)

  /** 主动做动画受控模式 */
  const controlledRef = useRef(false)

  /** 缩放比例 */
  const scaleRef = useSharedValue(1)

  /** 缩放转换的样式 */
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

  /** 结束动画 */
  const onAnimateEnd = useCallback(() => {
    setTimeout(() => {
      if (timeoutCancelRef.current) {
        clearTimeout(timeoutCancelRef.current)
      }
      scaleRef.value = 1
      animatedRef.current = true
      animatingRef.current = false
    }, duration + 16)
  }, [scaleRef])

  /** 开始动画 */
  const onAnimateStart = useCallback(() => {
    scaleRef.value = scale
    animatedRef.current = false
    animatingRef.current = true

    // 如果动画开始若干秒后都没有进行取消动画, 主动取消, 防止没有触发事件导致一直缩放
    if (timeoutCancelRef.current) {
      clearTimeout(timeoutCancelRef.current)
    }
    timeoutCancelRef.current = setTimeout(() => {
      timeoutCancelRef.current = null
      if (!controlledRef.current) onAnimateEnd()
    }, 1200)
  }, [onAnimateEnd, scale, scaleRef])

  /** 触摸事件 */
  const onStateChange = useCallback(
    (_from?: number, to?: number) => {
      if (to === TOUCHABLE_STATE.BEGAN) {
        hitRef.current = true
        timeoutStartRef.current = setTimeout(() => {
          timeoutStartRef.current = null
          if (!controlledRef.current && hitRef.current) onAnimateStart()
        }, 40)
        return
      }

      if (hitRef.current) {
        hitRef.current = false
        if (timeoutStartRef.current) {
          clearTimeout(timeoutStartRef.current)
        }
        if (!controlledRef.current) onAnimateEnd()
      }
    },
    [onAnimateStart, onAnimateEnd]
  )

  /** 复写 onPress, 保证 onPress 执行前至少进行过一次动画 */
  const _onPress = useCallback(() => {
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
          delayPressIn={64}
          onStateChange={onStateChange}
          onPressOut={onStateChange}
          onPress={_onPress}
        >
          <View>{children}</View>
        </GenericTouchable>
      </Animated.View>
    )
  })
}

export default TouchableAnimated
