import React, { useCallback, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import GenericTouchable, { TOUCHABLE_STATE } from 'react-native-gesture-handler/src/components/touchables/GenericTouchable'
/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 16:14:27
 */
import { USE_NATIVE_DRIVER } from '@constants'

const duration = 96
const delay = 0

function TouchableAnimated({
  style,
  useRN,
  delayPressIn,
  delayPressOut,
  scale = 0.95,
  extraButtonProps,
  onPress,
  children,
  ...other
}) {
  /** 防止快速滑动时触摸到减少缩放的标志 */
  const hitRef = useRef(false)

  /** 动画准备开始的标志 */
  const timeoutStartRef = useRef(null)

  /** 动画进行中 */
  const animatingRef = useRef(false)

  /** 动画进行完毕 */
  const animatedRef = useRef(false)

  /** 主动做动画受控模式 */
  const controlledRef = useRef(false)

  /** 透明度 */
  const opacityRef = useRef(new Animated.Value(1))

  /** 缩放 */
  const scaleRef = useRef(new Animated.Value(1))

  /** 结束动画 */
  const onAnimateEnd = useCallback(() => {
    setTimeout(() => {
      Animated.timing(opacityRef.current, {
        toValue: 1,
        duration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()
      Animated.timing(scaleRef.current, {
        toValue: 1,
        duration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()

      animatedRef.current = true
      animatingRef.current = false
    }, duration + delay)
  }, [])

  /** 开始动画 */
  const onAnimateStart = useCallback(() => {
    Animated.timing(opacityRef.current, {
      toValue: 0.72,
      duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: USE_NATIVE_DRIVER
    }).start()
    Animated.timing(scaleRef.current, {
      toValue: scale,
      duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: USE_NATIVE_DRIVER
    }).start()

    animatedRef.current = false
    animatingRef.current = true
  }, [scale, scaleRef])

  /** 触摸事件 */
  const onStateChange = useCallback(
    (_from?: number, to?: number) => {
      if (to === TOUCHABLE_STATE.BEGAN) {
        hitRef.current = true
        timeoutStartRef.current = setTimeout(() => {
          timeoutStartRef.current = null
          if (!controlledRef.current && hitRef.current) onAnimateStart()
        }, 240)
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
    }, duration + delay)
  }, [onAnimateStart, onAnimateEnd, onPress])

  return (
    <GenericTouchable
      {...other}
      delayPressIn={delay}
      delayPressOut={delay}
      extraButtonProps={extraButtonProps}
      onStateChange={onStateChange}
      onPress={_onPress}
    >
      <Animated.View
        style={[
          style,
          {
            opacity: opacityRef.current
          },
          {
            transform: [
              {
                scale: scaleRef.current
              }
            ]
          }
        ]}
      >
        {children}
      </Animated.View>
    </GenericTouchable>
  )
}

export default TouchableAnimated
