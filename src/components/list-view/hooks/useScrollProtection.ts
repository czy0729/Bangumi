/*
 * @Author: czy0729
 * @Date: 2026-06-29 07:08:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-29 07:08:58
 */
import { useCallback, useEffect, useRef } from 'react'
import { uiStore } from '@stores'
import { SCROLL_THRESHOLD } from '../ds'

import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

/**
 * 滚动保护 hook
 */
export function useScrollProtection() {
  const scrollStartYRef = useRef(0)
  const scrollLockedRef = useRef(false)
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 统一的重置与状态清理逻辑
  const resetScrollState = useCallback(() => {
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    scrollLockedRef.current = false
    uiStore.setScrolling(false)
  }, [])

  const onScrollBeginDrag = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollStartYRef.current = e?.nativeEvent?.contentOffset?.y ?? 0
    scrollLockedRef.current = false
  }, [])

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    // 核心优化：一旦进入锁定状态，直接熔断，避免每次滚动都去计算 Math.abs() 和读取属性
    if (scrollLockedRef.current) return

    const currentY = e?.nativeEvent?.contentOffset?.y ?? 0
    if (Math.abs(currentY - scrollStartYRef.current) > SCROLL_THRESHOLD) {
      scrollLockedRef.current = true
      uiStore.setScrolling(true)
    }
  }, [])

  const onScrollEndDrag = useCallback(() => {
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)

    // 采用防抖延迟结束滚动标记，避免瞬间的微小卡顿误判为滚动停止
    scrollEndTimerRef.current = setTimeout(resetScrollState, 100)
  }, [resetScrollState])

  const onMomentumScrollEnd = useCallback(() => {
    resetScrollState()
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
