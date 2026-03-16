/*
 * @Author: czy0729
 * @Date: 2026-03-17 04:03:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 04:14:54
 */
import React, { useEffect, useMemo, useState } from 'react'
import { PanResponder } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { stl } from '@utils'

const SCALE = 6 / 5

function SwitchProComp({
  width = 52,
  height = 32,
  value: propValue = false,
  disabled = false,
  circleColorActive = 'white',
  circleColorInactive = 'white',
  backgroundActive = '#43d551',
  backgroundInactive = '#dddddd',
  style,
  circleStyle,
  onAsyncPress,
  onSyncPress,
  ...rest
}: any) {
  /** 是圆圈可移动的净距离：容器总宽 - 圆圈直径 - 两侧内边距(假设为2) */
  const offset = width - height

  /** 稍微调小一点，确保在容器内不溢出 */
  const handlerSize = height - 4

  const [value, setValue] = useState(propValue)
  const [toggleable, setToggleable] = useState(true)

  const handlerAnimation = useSharedValue(handlerSize)

  /** 使用 0 (关闭) 和 1 (开启) 作为动画映射值 */
  const switchAnimation = useSharedValue(value ? 1 : 0)

  const animateHandler = (v: number) => {
    handlerAnimation.value = withTiming(v, { duration: 200 })
  }

  const animateSwitch = (v: boolean) => {
    switchAnimation.value = withTiming(v ? 1 : 0, { duration: 200 })
  }

  const toggleSwitch = (result: boolean, callback: any = () => null) => {
    toggleSwitchToValue(result, !value, callback)
  }

  const toggleSwitchToValue = (result: boolean, toValue: boolean, callback: any = () => null) => {
    animateHandler(handlerSize)
    if (result) {
      animateSwitch(toValue)
      setValue(toValue)
      callback?.(toValue)
    }
  }

  useEffect(() => {
    if (propValue !== value) {
      toggleSwitchToValue(true, propValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          if (disabled) return
          setToggleable(true)
          animateHandler(handlerSize * SCALE)
        },
        onPanResponderMove: (_evt, gestureState) => {
          if (disabled) return
          setToggleable(value ? gestureState.dx < 10 : gestureState.dx > -10)
        },
        onPanResponderRelease: () => {
          if (disabled) return
          if (toggleable) {
            if (onSyncPress) toggleSwitch(true, onSyncPress)
            else onAsyncPress?.(toggleSwitch)
          } else {
            animateHandler(handlerSize)
          }
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, toggleable, disabled]
  )

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      switchAnimation.value,
      [0, 1],
      [backgroundInactive, backgroundActive]
    )
  }))

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    width: handlerAnimation.value,
    height: handlerSize,
    backgroundColor: interpolateColor(
      switchAnimation.value,
      [0, 1],
      [circleColorInactive, circleColorActive]
    ),
    borderRadius: handlerSize / 2,
    transform: [{ translateX: switchAnimation.value * offset }] // 这里的 offset 是移动的终点
  }))

  return (
    <Animated.View
      {...rest}
      {...panResponder.panHandlers}
      style={stl(
        {
          justifyContent: 'center',
          width,
          height,
          padding: 2, // 内部留白防止圆圈紧贴边缘
          borderRadius: height / 2,
          overflow: 'hidden'
        },
        containerAnimatedStyle,
        style
      )}
    >
      <Animated.View style={stl(circleAnimatedStyle, circleStyle)} />
    </Animated.View>
  )
}

export default SwitchProComp
