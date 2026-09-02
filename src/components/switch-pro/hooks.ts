/*
 * @Author: czy0729
 * @Date: 2026-09-03 00:12:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 01:07:24
 *
 * 开关状态机: 受控值同步 + 拖动手势判定 + 圆圈/背景进度动画
 */
import { useCallback, useEffect, useRef } from 'react'
import { PanResponder } from 'react-native'
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { getHandlerSize, getNextToggleable, getOffset } from './utils'
import { ANIMATION_DURATION, HANDLER_SCALE } from './ds'

import type { PanResponderInstance } from 'react-native'
import type { ToggleSwitchFn, UseSwitchOptions } from './types'

export const useSwitch = ({
  value: propValue = false,
  width = 52,
  height = 32,
  disabled = false,
  backgroundActive,
  backgroundInactive,
  circleColorActive = 'white',
  circleColorInactive = 'white',
  onSyncPress,
  onAsyncPress
}: UseSwitchOptions) => {
  /** 圆圈水平位移净距离 */
  const offset = getOffset(width, height)
  /** 圆圈直径 */
  const handlerSize = getHandlerSize(height)

  /** 当前值快照 (权威值, 渲染不直接依赖), 供手势 / 异步切换读取最新值, 避免闭包过期 */
  const valueRef = useRef(propValue)
  /** 拖动中松手是否允许切换 */
  const toggleableRef = useRef(true)
  /** 圆圈直径快照 */
  const handlerSizeRef = useRef(handlerSize)
  /** 是否禁用快照 */
  const disabledRef = useRef(disabled)
  /** 回调快照, 供一次性创建的 PanResponder 读取最新引用 */
  const callbacksRef = useRef({ onSyncPress, onAsyncPress })
  handlerSizeRef.current = handlerSize
  disabledRef.current = disabled
  callbacksRef.current = { onSyncPress, onAsyncPress }

  /** 圆圈宽度动画值 */
  const handlerAnimation = useSharedValue(handlerSize)
  /** 开关进度 0 (关) / 1 (开) */
  const switchAnimation = useSharedValue(propValue ? 1 : 0)

  /** 动画圆圈宽度 */
  const animateHandler = useCallback(
    (v: number) => {
      handlerAnimation.value = withTiming(v, { duration: ANIMATION_DURATION })
    },
    [handlerAnimation]
  )

  /** 动画开关进度 */
  const animateSwitch = useCallback(
    (v: boolean) => {
      switchAnimation.value = withTiming(v ? 1 : 0, { duration: ANIMATION_DURATION })
    },
    [switchAnimation]
  )

  /**
   * 切换到指定值, result 为 false 时仅回弹圆圈宽度 (异步取消场景)
   *
   * @param result 是否确认切换
   * @param toValue 目标值
   * @param callback 切换确认后的回调
   */
  const toggleToValue = useCallback(
    (result: boolean, toValue: boolean, callback?: (value: boolean) => void) => {
      animateHandler(handlerSizeRef.current)
      if (result) {
        valueRef.current = toValue
        animateSwitch(toValue)
        callback?.(toValue)
      }
    },
    [animateHandler, animateSwitch]
  )

  /**
   * 切换到当前值的相反值, 供 onAsyncPress 异步完成后调用
   *
   * @param result 是否确认切换
   * @param callback 切换确认后的回调
   */
  const toggleSwitch = useCallback<ToggleSwitchFn>(
    (result, callback) => {
      toggleToValue(result, !valueRef.current, callback)
    },
    [toggleToValue]
  )

  // 外部受控值变化时, 与内部值不一致则动画过渡到目标值
  useEffect(() => {
    if (propValue !== valueRef.current) {
      toggleToValue(true, propValue)
    }
  }, [propValue, toggleToValue])

  // 手势回调全部读 ref 快照, PanResponder 只创建一次, 避免拖动中重建导致手势状态丢失
  const panResponderRef = useRef<PanResponderInstance | null>(null)
  if (!panResponderRef.current) {
    panResponderRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (disabledRef.current) return
        toggleableRef.current = true
        animateHandler(handlerSizeRef.current * HANDLER_SCALE)
      },
      onPanResponderMove: (_evt, gestureState) => {
        if (disabledRef.current) return
        toggleableRef.current = getNextToggleable(valueRef.current, gestureState.dx)
      },
      onPanResponderRelease: () => {
        if (disabledRef.current) return

        const { onSyncPress: onSync, onAsyncPress: onAsync } = callbacksRef.current
        if (toggleableRef.current) {
          if (onSync) toggleToValue(true, !valueRef.current, onSync)
          else onAsync?.(toggleSwitch)
        } else {
          animateHandler(handlerSizeRef.current)
        }
      }
    })
  }

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(switchAnimation.value, [0, 1], [
      backgroundInactive,
      backgroundActive
    ] as string[])
  }))

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    width: handlerAnimation.value,
    height: handlerSize,
    backgroundColor: interpolateColor(switchAnimation.value, [0, 1], [
      circleColorInactive,
      circleColorActive
    ] as string[]),
    borderRadius: handlerSize / 2,
    transform: [
      {
        // 位移终点即圆圈可移动的净距离
        translateX: switchAnimation.value * offset
      }
    ]
  }))

  return {
    /** 容器宽度 */
    width,
    /** 容器高度 */
    height,
    /** 手势事件绑定, 展开到容器上 */
    panHandlers: panResponderRef.current.panHandlers,
    /** 容器动画样式: 背景色随开关进度过渡 */
    containerAnimatedStyle,
    /** 圆圈动画样式: 宽度 / 颜色 / 位移随开关进度过渡 */
    circleAnimatedStyle
  }
}
