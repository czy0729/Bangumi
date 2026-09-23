/*
 * @Author: czy0729
 * @Date: 2026-08-17 21:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 08:00:00
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { uiStore } from '@stores'
import { JUMP_SETTLE_DURATION } from './ds'

import type { LayoutChangeEvent } from 'react-native'
import type { Layout } from 'react-native-tab-view/src/types'
import type { UseTabViewKeepOptions, UseTabViewSwipeOptions } from './types'

/** 页面布局测量 */
export function useTabViewLayout(initialLayout?: Partial<Layout>) {
  const [layout, setLayout] = useState<Layout>(() => ({
    width: 0,
    height: 0,
    ...initialLayout
  }))

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    setLayout(prev => (prev.width === width && prev.height === height ? prev : { width, height }))
  }, [])

  return { layout, handleLayout }
}

/** 页码变更回调（相同页码不触发） */
export function useTabViewIndexChange(index: number, onIndexChange: (index: number) => void) {
  return useCallback(
    (next: number) => {
      if (next !== index) onIndexChange(next)
    },
    [index, onIndexChange]
  )
}

/** 滑动状态（拦截点击 + 延时放行纵向拖动） */
export function useTabViewSwipe({ onSwipeStart, onSwipeEnd }: UseTabViewSwipeOptions) {
  const [isSwiping, setIsSwiping] = useState(false)
  const settleTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const endTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const clearTimers = useCallback(() => {
    clearTimeout(settleTimerRef.current)
    clearTimeout(endTimerRef.current)
    clearTimeout(unlockTimerRef.current)
  }, [])

  // 卸载后不再触发回调与状态复位, 避免定时器泄漏
  useEffect(() => clearTimers, [clearTimers])

  const handleSwipeStart = useCallback(() => {
    // 上一轮手势的收尾定时器尚未执行时, 先同步放行其结束回调,
    // 防止快速连续滑动时旧的放行计时打断新一轮的点击保护
    if (endTimerRef.current) {
      clearTimeout(endTimerRef.current)
      endTimerRef.current = undefined

      setIsSwiping(false)
      onSwipeEnd?.()
      uiStore.setScrolling(false)
    }
    // end 已触发而滚动放行计时仍在挂起时, 清掉以保持锁定, 由新一轮手势接管
    clearTimeout(settleTimerRef.current)
    settleTimerRef.current = undefined
    clearTimeout(unlockTimerRef.current)
    unlockTimerRef.current = undefined

    uiStore.setScrolling(true)
    setIsSwiping(true)
    onSwipeStart?.()
  }, [onSwipeStart, onSwipeEnd])

  /** 松手 (settling) 后延时放行纵向拖动, 期间仍拦截点击, 兼顾翻页动画的点击保护 */
  const handleSwipeSettle = useCallback(() => {
    clearTimeout(settleTimerRef.current)
    settleTimerRef.current = setTimeout(() => {
      settleTimerRef.current = undefined
      setIsSwiping(false)
    }, 150)
  }, [])

  const handleSwipeEnd = useCallback(() => {
    clearTimeout(settleTimerRef.current)
    settleTimerRef.current = undefined

    clearTimeout(endTimerRef.current)
    endTimerRef.current = setTimeout(() => {
      endTimerRef.current = undefined
      setIsSwiping(false)
      onSwipeEnd?.()

      unlockTimerRef.current = setTimeout(() => {
        unlockTimerRef.current = undefined
        uiStore.setScrolling(false)
      }, 0)
    }, 300)
  }, [onSwipeEnd])

  return { isSwiping, handleSwipeStart, handleSwipeSettle, handleSwipeEnd }
}

/**
 * 场景保活范围
 *
 * 页码变更后只保活相邻场景; 跨级跳转时 Pager 的翻页动画会滚过中间页,
 * 故额外把 [当前页, 目标页] 区间纳入保活, 停稳后收缩
 */
export function useTabViewKeep({ index, keepDistance, routes }: UseTabViewKeepOptions) {
  const [targetIndex, setTargetIndex] = useState<number>()
  const pagerJumpToRef = useRef<(key: string) => void>(undefined)
  const targetTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const stateRef = useRef({ index, keepDistance, routes })

  // 延后到渲染完成再同步, 保证点击跳转时读到的是最新页码与配置
  useEffect(() => {
    stateRef.current = { index, keepDistance, routes }
  })

  // 页码到达目标页即 jump 动画结束, 此时才收缩; 动画未结束时收缩会卸载仍在视口内的中间页
  useEffect(() => {
    if (targetIndex === undefined || index !== targetIndex) return

    clearTimeout(targetTimerRef.current)
    targetTimerRef.current = undefined
    setTargetIndex(undefined)
  }, [index, targetIndex])

  useEffect(
    () => () => {
      clearTimeout(targetTimerRef.current)
    },
    []
  )

  /** 记录 Pager 的 jumpTo, 供包装后的 jumpTo 调用 */
  const registerJumpTo = useCallback((jumpTo: (key: string) => void) => {
    pagerJumpToRef.current = jumpTo
  }, [])

  const jumpTo = useCallback((key: string) => {
    const { index, keepDistance, routes } = stateRef.current
    const next = routes.findIndex(route => route.key === key)

    if (next >= 0 && Math.abs(next - index) > keepDistance) {
      setTargetIndex(next)

      clearTimeout(targetTimerRef.current)
      targetTimerRef.current = setTimeout(() => setTargetIndex(undefined), JUMP_SETTLE_DURATION)
    }

    pagerJumpToRef.current?.(key)
  }, [])

  return {
    keepFrom: Math.min(index, targetIndex ?? index) - keepDistance,
    keepTo: Math.max(index, targetIndex ?? index) + keepDistance,
    jumpTo,
    registerJumpTo
  }
}
