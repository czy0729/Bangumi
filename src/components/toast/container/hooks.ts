/*
 * @Author: czy0729
 * @Date: 2026-08-12 07:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 01:23:05
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated'
import { scheduleOnRN } from '@utils'

import type { ToastType } from '../types'

/** 淡入淡出时长 (ms) */
const FADE_DURATION = 200

/** loading 显示关闭按钮的延迟 (ms) */
const LOADING_SHOW_CLOSE_DELAY = 5600

/** Toast 单条提示动画状态: 淡入 → 停留 → 淡出, loading 定时显示关闭 */
export const useToastAnimation = (
  duration: number,
  type: ToastType,
  onClose?: () => void,
  onAnimationEnd?: () => void
) => {
  const [showClose, setShowClose] = useState(false)
  const opacity = useSharedValue(0)
  const endCalledRef = useRef(false)

  // 稳定函数引用, 供动画 worklet 通过 scheduleOnRN 回调 (内联箭头会在 worklet 序列化时导致 iOS 原生闪退)
  const handleAnimationEnd = useCallback(() => {
    if (endCalledRef.current) return
    endCalledRef.current = true
    if (onClose) onClose()
    if (onAnimationEnd) onAnimationEnd()
  }, [onClose, onAnimationEnd])

  useEffect(() => {
    opacity.value = withTiming(1, { duration: FADE_DURATION }, finished => {
      if (!finished || duration <= 0) return
      opacity.value = withDelay(
        duration * 1000,
        withTiming(0, { duration: FADE_DURATION }, end => {
          if (!end) return
          scheduleOnRN(handleAnimationEnd)
        })
      )
    })

    let timer: ReturnType<typeof setTimeout>
    if (type === 'loading') {
      timer = setTimeout(() => {
        setShowClose(true)
      }, LOADING_SHOW_CLOSE_DELAY)
    }
    return () => {
      clearTimeout(timer)
      cancelAnimation(opacity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, type, opacity])

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return { showClose, animatedStyle }
}
