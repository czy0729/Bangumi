/*
 * @Author: czy0729
 * @Date: 2026-11-13 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 12:00:00
 *
 * 抽屉开合动画与边缘手势
 */
import { useEffect, useMemo, useRef } from 'react'
import { Animated, PanResponder } from 'react-native'
import { IOS, USE_NATIVE_DRIVER } from '@constants'
import { DRAWER_DURATION, DRAWER_WITDH, SWIPE_CLOSE_RATIO, SWIPE_CLOSE_VELOCITY } from './ds'

/** 抽屉开合进度 (0 收起, 1 展开) */
export function useDrawerProgress(show: boolean) {
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(progress, {
      toValue: show ? 1 : 0,
      duration: DRAWER_DURATION,
      useNativeDriver: USE_NATIVE_DRIVER
    }).start()
  }, [progress, show])

  return progress
}

type SwipeOptions = {
  progress: Animated.Value
  show: boolean
  position: 'left' | 'right'
  onToggle: () => void
  swipeToClose?: boolean
}

/** 靠近遮罩一侧的边缘手势, 朝收起方向拖动关闭抽屉 */
export function useDrawerSwipe({ progress, show, position, onToggle, swipeToClose }: SwipeOptions) {
  const enabled = IOS && !!swipeToClose

  const panHandlers = useMemo(() => {
    if (!enabled) return undefined

    const distance = (dx: number) => (position === 'left' ? Math.max(0, -dx) : Math.max(0, dx))

    const springBack = () => {
      Animated.timing(progress, {
        toValue: 1,
        duration: DRAWER_DURATION,
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()
    }

    return PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_event, gesture) => {
        if (!show) return false
        if (Math.abs(gesture.dx) <= Math.abs(gesture.dy)) return false

        return position === 'left' ? gesture.dx < -2 : gesture.dx > 2
      },
      onPanResponderGrant: () => {
        progress.stopAnimation()
      },
      onPanResponderMove: (_event, gesture) => {
        progress.setValue(1 - Math.min(distance(gesture.dx) / DRAWER_WITDH, 1))
      },
      onPanResponderRelease: (_event, gesture) => {
        const velocity = position === 'left' ? -gesture.vx : gesture.vx
        if (
          distance(gesture.dx) / DRAWER_WITDH >= SWIPE_CLOSE_RATIO ||
          velocity >= SWIPE_CLOSE_VELOCITY
        ) {
          onToggle()
          return
        }

        springBack()
      },
      onPanResponderTerminate: springBack
    }).panHandlers
  }, [enabled, onToggle, position, progress, show])

  return enabled && show ? panHandlers : undefined
}
