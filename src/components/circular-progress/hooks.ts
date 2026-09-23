/*
 * @Author: czy0729
 * @Date: 2026-09-16 22:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 06:46:57
 *
 * 圆环进度专属 hooks: 不确定态的匀速旋转 (RN 核心 Animated, 原生驱动)
 */
import { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { useActive } from '@utils/hooks'
import { SPIN_DURATION } from './ds'

import type { SpinInterpolation } from './types'

/**
 * 不确定态旋转
 *  - 动画全程运行在原生线程 (useNativeDriver), 不占用 JS 帧
 *  - active 变为 false 时停止并复位, 避免退出不确定态后仍在空跑
 *
 * @param active 是否处于不确定态 (拿不到精确进度)
 */
export function useSpin(active: boolean): SpinInterpolation {
  const isActive = useActive()

  const rotate = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!active || !isActive) return

    const animation = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: SPIN_DURATION,
        easing: Easing.linear,
        useNativeDriver: true
      })
    )
    animation.start()

    return () => {
      animation.stop()
      rotate.setValue(0)
    }
  }, [active, isActive, rotate])

  return rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
}
