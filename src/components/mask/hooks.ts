/*
 * @Author: czy0729
 * @Date: 2026-09-10 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 05:18:37
 *
 * 遮罩显隐: 淡入淡出, 淡出结束后把 showValue 置为 false (组件常驻挂载, showValue 仅用于触摸拦截判定)
 */
import { useEffect, useRef, useState } from 'react'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

/** 动画时长 (ms) */
export const MASK_DURATION = 200

/** 遮罩显隐渐变动画 */
export function useMask(show: boolean, duration: number = MASK_DURATION) {
  const [showValue, setShow] = useState(show)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  /**
   * 动画进度: 固定从 0 开始, 由 effect 驱动到目标值
   * 不可用 useAnimatedStyle 直接按 show 计算目标值: 组件在 show 为 true 时才挂载的场景下
   * 首帧求值直接落到目标态 (reanimated 首次不产生过渡), 表现为遮罩出现无淡入动画
   */
  const opacity = useSharedValue(0)

  useEffect(() => {
    clearTimeout(timerRef.current)

    opacity.value = withTiming(show ? 1 : 0, { duration })

    if (show) {
      setShow(true)
      return
    }

    // 淡出结束再卸载, 用 JS 定时器代替 withTiming 回调 (回调同样要跨 runtime 转换)
    timerRef.current = setTimeout(() => setShow(false), duration)

    return () => clearTimeout(timerRef.current)
  }, [show, duration, opacity])

  const maskStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return {
    /** 是否处于展示态 (淡出结束后才为 false) */
    showValue,

    /** 遮罩渐变样式 */
    maskStyle
  }
}
