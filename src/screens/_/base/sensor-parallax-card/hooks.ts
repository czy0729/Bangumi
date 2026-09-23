/*
 * @Author: czy0729
 * @Date: 2026-09-22 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-22 10:00:00
 *
 * 视差共享值与其变换样式
 * */
import { useEffect } from 'react'
import {
  cancelAnimation,
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import {
  MAX_ROTATE,
  MAX_TRANSLATE,
  PERSPECTIVE_FLAT,
  PERSPECTIVE_ROTATE,
  RESTORE_DURATION,
  RESTORE_EASING
} from './ds'

import type { ParallaxValues, UseParallaxOptions } from './types'

/** 视差共享值 + 变换样式 */
export function useParallax({ active, enabled, enableRotate }: UseParallaxOptions) {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)
  const rotateEnabled = useSharedValue(enableRotate)

  useEffect(() => {
    rotateEnabled.value = enableRotate
  }, [enableRotate, rotateEnabled])

  /** 失焦或关闭视差时归位, 采样驱动由挂载条件卸载 */
  useEffect(() => {
    if (active && enabled) return

    cancelAnimation(translateX)
    cancelAnimation(translateY)
    cancelAnimation(rotateX)
    cancelAnimation(rotateY)

    const config = { duration: RESTORE_DURATION, easing: RESTORE_EASING }
    translateX.value = withTiming(0, config)
    translateY.value = withTiming(0, config)
    rotateX.value = withTiming(0, config)
    rotateY.value = withTiming(0, config)
  }, [active, enabled, rotateX, rotateY, translateX, translateY])

  const values: ParallaxValues = {
    translateX,
    translateY,
    rotateX,
    rotateY,
    rotateEnabled
  }

  const animatedStyle = useAnimatedStyle(() => {
    const tX = clamp(translateX.value, -MAX_TRANSLATE, MAX_TRANSLATE)
    const tY = clamp(translateY.value, -MAX_TRANSLATE, MAX_TRANSLATE)
    const rX = clamp(rotateX.value, -MAX_ROTATE, MAX_ROTATE)
    const rY = clamp(rotateY.value, -MAX_ROTATE, MAX_ROTATE)

    return {
      transform: [
        { perspective: rotateEnabled.value ? PERSPECTIVE_ROTATE : PERSPECTIVE_FLAT },
        { rotateX: `${rX}deg` },
        { rotateY: `${rY}deg` },
        { translateX: tX },
        { translateY: tY }
      ]
    } as const
  })

  return { values, animatedStyle }
}
