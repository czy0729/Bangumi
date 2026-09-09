/*
 * @Author: czy0729
 * @Date: 2026-09-10 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 05:18:37
 *
 * 遮罩显隐: 淡入淡出, 淡出结束后再卸载
 */
import { useEffect, useRef, useState } from 'react'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

/** 动画时长 (ms) */
export const MASK_DURATION = 200

/** 遮罩显隐渐变动画 */
export function useMask(show: boolean, duration: number = MASK_DURATION) {
  const [showValue, setShow] = useState(show)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    clearTimeout(timerRef.current)

    if (show) {
      setShow(true)
      return
    }

    // 淡出结束再卸载, 用 JS 定时器代替 withTiming 回调 (回调同样要跨 runtime 转换)
    timerRef.current = setTimeout(() => setShow(false), duration)

    return () => clearTimeout(timerRef.current)
  }, [show, duration])

  const maskStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(show ? 1 : 0, {
        duration
      })
    }),
    [show, duration]
  )

  return {
    /** 是否处于展示态 (淡出结束后才为 false) */
    showValue,

    /** 遮罩渐变样式 */
    maskStyle
  }
}
