/*
 * @Author: czy0729
 * @Date: 2026-06-29 07:08:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-29 07:08:58
 */
import { useCallback, useEffect, useRef } from 'react'
import { uiStore } from '@stores'
import { SCROLL_IDLE_MS, SCROLL_THRESHOLD } from '../ds'

import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

/**
 * 滚动保护 hook
 */
export function useScrollProtection() {
  /** 滚动起始 Y 坐标，用于计算滑动距离是否超过阈值 */
  const scrollStartYRef = useRef(0)

  /** 是否已锁定点击，超过阈值后为 true */
  const scrollLockedRef = useRef(false)

  /** 滚动手势结束防抖定时器（100ms） */
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /** 滚动空闲超时定时器（300ms），兜底释放 isScrolling */
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /** 统一的重置与状态清理逻辑 */
  const resetScrollState = useCallback(() => {
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current)
    scrollLockedRef.current = false
    uiStore.setScrolling(false)
  }, [])

  /** 手指按下开始拖动 → 重置所有定时器和滚动起始位置 */
  const onScrollBeginDrag = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current)
    scrollStartYRef.current = e?.nativeEvent?.contentOffset?.y ?? 0
    scrollLockedRef.current = false
  }, [])

  /** 滚动中 → 距离超过阈值时锁定点击，同时持续刷新空闲超时 */
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      // 滚动空闲超时：每次 onScroll 重置定时器，停止触发后自动释放 isScrolling
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current)
      scrollIdleTimerRef.current = setTimeout(resetScrollState, SCROLL_IDLE_MS)

      // 核心优化：一旦进入锁定状态，直接熔断，避免每次滚动都去计算 Math.abs() 和读取属性
      if (scrollLockedRef.current) return

      const currentY = e?.nativeEvent?.contentOffset?.y ?? 0
      if (Math.abs(currentY - scrollStartYRef.current) > SCROLL_THRESHOLD) {
        scrollLockedRef.current = true
        uiStore.setScrolling(true)
      }
    },
    [resetScrollState]
  )

  /** 手指抬起 → 100ms 防抖后释放滚动锁 */
  const onScrollEndDrag = useCallback(() => {
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)

    // 采用防抖延迟结束滚动标记，避免瞬间的微小卡顿误判为滚动停止
    scrollEndTimerRef.current = setTimeout(resetScrollState, 100)
  }, [resetScrollState])

  /** 惯性滚动结束 → 100ms 防抖后释放滚动锁 */
  const onMomentumScrollEnd = useCallback(() => {
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    scrollEndTimerRef.current = setTimeout(resetScrollState, 100)
  }, [resetScrollState])

  /** * 合并滚动回调，确保滑动保护始终生效
   * 优化点：规范泛型和更安全的判断逻辑，剔除未定义的任意对象类型
   */
  const mergeScrollCallback = useCallback(
    <T extends Record<string, any>, K extends keyof T>(
      passProps: T,
      key: K,
      internal: (...args: any[]) => void
    ) => {
      const userHandler = passProps[key]

      if (typeof userHandler === 'function') {
        passProps[key] = ((...args: any[]) => {
          internal(...args)
          userHandler(...args)
        }) as unknown as T[K]
      } else if (userHandler == null) {
        // 只有在用户没传，且不是 AnimatedEvent 的时候才赋值
        passProps[key] = internal as unknown as T[K]
      }
      // 如果 userHandler 存在且不是 function（比如 Animated.event），保持原样，直接走底层的原生事件驱动
    },
    []
  )

  /** 组件卸载时清理定时器，并强制释放滚动锁定，防止全局状态卡死 */
  useEffect(() => {
    return resetScrollState
  }, [resetScrollState])

  return {
    onScrollBeginDrag,
    onScroll,
    onScrollEndDrag,
    onMomentumScrollEnd,
    mergeScrollCallback
  }
}
