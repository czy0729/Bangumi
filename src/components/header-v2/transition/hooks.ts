/*
 * @Author: czy0729
 * @Date: 2026-09-08 23:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 00:00:00
 */
import { useEffect } from 'react'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

/** 渐显动画时长 (ms) */
const TRANSITION_DURATION = 160

/** 隐藏时标题下移距离 (px) */
const TRANSLATE_Y = 24

/**
 * 头部渐显动画 (透明度 + 标题上移)
 *
 * @fixed Expo 57 / RN 0.86 新架构上不能用 JS prop 直接驱动 useAnimatedStyle 里的 withTiming
 * (靠 useEffect 重建 mapper 单次执行样式更新, 首次更新可能被丢弃导致头部不出现)
 * 改为共享值驱动: fixed 变化时写入 progress.value, 由共享值变化直接触发 UI 线程更新
 */
export function useTransitionProgress(fixed: boolean) {
  const progress = useSharedValue(fixed ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(fixed ? 1 : 0, {
      duration: TRANSITION_DURATION
    })
  }, [fixed, progress])

  const wrapStyles = useAnimatedStyle(() => ({
    opacity: progress.value
  }))

  const bodyStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: (1 - progress.value) * TRANSLATE_Y
      }
    ]
  }))

  return {
    /** 容器渐显样式 */
    wrapStyles,

    /** 标题上移样式 */
    bodyStyles
  }
}
