/*
 * @Author: czy0729
 * @Date: 2026-08-10 23:51:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 05:23:53
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { AccessibilityInfo, Animated, Platform } from 'react-native'
import {
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

/**
 * 骨架屏扫光动画 hook (RN Animated 原生驱动)
 *
 * 使用 RN Animated 原生驱动 (useNativeDriver), 动画全程运行于 UI 线程, 不占用 JS 线程。
 * 系统开启"减少动态效果"时 (AccessibilityInfo) 停止循环, 渲染静态渐变。
 */
export const useShimmerAnimation = (width: number | undefined, duration: number) => {
  const [reduceMotion, setReduceMotion] = useState(false)
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion)
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion)
    return () => subscription.remove()
  }, [])

  useEffect(() => {
    if (reduceMotion || typeof width !== 'number') return
    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration,
        useNativeDriver: Platform.OS !== 'web'
      })
    )
    animation.start()
    return () => {
      animation.stop()
    }
  }, [progress, duration, width, reduceMotion])

  const translateX = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: typeof width === 'number' ? [-width, width] : [0, 0]
      }),
    [progress, width]
  )

  return {
    transform: [{ translateX }]
  }
}

/**
 * 骨架屏扫光动画 hook (Reanimated)
 *
 * 全程运行于 UI 线程 (worklet), 动画循环期间不触发 React 重渲染。
 * 系统开启"减少动态效果"时 (useReducedMotion) 停止循环, 渲染静态渐变。
 */
export const useShimmerAnimationReanimated = (width: number | undefined, duration: number) => {
  const reduceMotion = useReducedMotion()
  const progress = useSharedValue(0)

  useEffect(() => {
    if (reduceMotion || typeof width !== 'number') return
    progress.value = withRepeat(withTiming(1, { duration }), -1, false)
    return () => {
      progress.value = 0
    }
  }, [reduceMotion, width, duration, progress])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          reduceMotion || typeof width !== 'number'
            ? 0
            : interpolate(progress.value, [0, 1], [-width, width])
      }
    ]
  }))

  return animatedStyle
}
