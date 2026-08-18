/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import { useCallback, useEffect, useRef } from 'react'
import { systemStore, uiStore } from '@stores'
import { useMask } from './mask'
import { getShowMaskValue, shouldLockScrolling } from './utils'
import { SCROLL_IDLE_MS, SCROLL_RELEASE_MS } from './ds'

import type { ScrollView as RNScrollView } from 'react-native'
import type { TimerRef } from '@types'
import type {
  ScrollEvent,
  ScrollLockOptions,
  ScrollTo,
  UseHorizontalMaskOptions,
  UseScrollViewRefOptions
} from './types'

/**
 * 水平滚动渐隐遮罩
 *
 * 组合遮罩显隐决策 (未显式传入时读全局设置) 与 useMask 动画,
 * 并包装 onScroll / onContentSizeChange 使遮罩跟随横向滚动同步; 非水平模式全部空转
 */
export function useHorizontalMask({
  horizontal,
  showMask,
  maskColors,
  onContentSizeChange
}: UseHorizontalMaskOptions) {
  const showMaskValue = getShowMaskValue(
    horizontal,
    showMask,
    systemStore.setting.horizontalShowMask
  )

  const {
    leftMaskStyle,
    rightMaskStyle,
    maskColors: resolvedMaskColors,
    handleLayout,
    handleContentSizeChange,
    handleScroll
  } = useMask(maskColors)

  /** 滚动回调, 横向且显示遮罩时同步遮罩位置 */
  const handleOnScroll = useCallback(
    (evt: ScrollEvent) => {
      if (showMaskValue && horizontal) handleScroll(evt)
    },
    [handleScroll, horizontal, showMaskValue]
  )

  /** 内容尺寸变化回调, 横向遮罩需要同步更新 */
  const handleOnContentSizeChange = useCallback(
    (w: number, h: number) => {
      if (showMaskValue && horizontal) handleContentSizeChange(w)
      onContentSizeChange?.(w, h)
    },
    [handleContentSizeChange, horizontal, onContentSizeChange, showMaskValue]
  )

  return {
    showMaskValue,
    leftMaskStyle,
    rightMaskStyle,
    maskColors: resolvedMaskColors,
    handleLayout,
    handleOnScroll,
    handleOnContentSizeChange
  }
}

/** ScrollView 实例引用, 按场景分配引用方式 (ScrollToTop / forwardRef / connectRef) */
export function useScrollViewRef({ scrollToTop, forwardRef, connectRef }: UseScrollViewRefOptions) {
  /** ScrollView 实例引用 */
  const scrollViewEl = useRef<RNScrollView['scrollTo'] | null>(null)

  /** ref 回调, 按场景分配引用方式 */
  const ref = useCallback(
    (node: RNScrollView | null) => {
      if (!node) return
      if (scrollToTop) {
        scrollViewEl.current = node.scrollTo
      } else if (forwardRef || connectRef) {
        ;(forwardRef || connectRef)?.(node.scrollTo as ScrollTo, node)
      }
    },
    [connectRef, forwardRef, scrollToTop]
  )

  /** 稳定引用的 scrollTo, 调用时懒读取实例 (ref 在渲染后才赋值, 渲染期直读会得到 null) */
  const scrollTo = useCallback((params: { x?: number; y?: number; animated?: boolean }) => {
    scrollViewEl.current?.(params)
  }, [])

  return { ref, scrollTo }
}

/**
 * 全局滚动锁状态机
 *
 * 拖动距离超过阈值后锁定全局点击 (uiStore.setScrolling), 防止滚动中误触 Touchable;
 * 通过空闲超时 / 手势结束防抖两种路径释放, 卸载时强制释放防止收起中的滚动容器卡死点击
 */
export function useScrollLock({
  onScroll,
  onScrollBeginDrag,
  onScrollEndDrag,
  onMomentumScrollEnd
}: ScrollLockOptions) {
  /** 滚动起始 Y 坐标, 用于计算滑动距离是否超过阈值 */
  const scrollStartY = useRef(0)

  /** 是否已锁定点击, 超过阈值后为 true */
  const scrollLocked = useRef(false)

  /** 滚动手势结束防抖定时器 */
  const scrollEndTimer = useRef<TimerRef | null>(null)

  /** 滚动空闲超时定时器, 兜底释放 isScrolling */
  const scrollIdleTimer = useRef<TimerRef | null>(null)

  const clearTimers = useCallback(() => {
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
    if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
  }, [])

  /** 释放滚动锁 */
  const releaseScroll = useCallback(() => {
    scrollLocked.current = false
    uiStore.setScrolling(false)
  }, [])

  const handleScroll = useCallback(
    (evt: ScrollEvent) => {
      // 每次 onScroll 重置空闲定时器, 停止触发后自动释放 isScrolling
      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
      scrollIdleTimer.current = setTimeout(() => {
        scrollLocked.current = false
        uiStore.setScrolling(false)
      }, SCROLL_IDLE_MS)

      // 滑动距离超过阈值才锁定
      if (
        !scrollLocked.current &&
        shouldLockScrolling(evt.nativeEvent.contentOffset.y, scrollStartY.current)
      ) {
        scrollLocked.current = true
        uiStore.setScrolling(true)
      }

      onScroll?.(evt)
    },
    [onScroll]
  )

  /** 手指按下开始拖动 → 重置所有定时器和锁定状态 */
  const handleScrollBeginDrag = useCallback(
    (evt: ScrollEvent) => {
      clearTimers()
      scrollStartY.current = evt.nativeEvent.contentOffset.y
      scrollLocked.current = false
      onScrollBeginDrag?.(evt)
    },
    [clearTimers, onScrollBeginDrag]
  )

  /** 手指抬起 → 防抖后释放滚动锁 (覆盖惯性残留) */
  const handleScrollEndDrag = useCallback(
    (evt: ScrollEvent) => {
      clearTimers()
      scrollEndTimer.current = setTimeout(releaseScroll, SCROLL_RELEASE_MS)
      onScrollEndDrag?.(evt)
    },
    [clearTimers, onScrollEndDrag, releaseScroll]
  )

  /** 惯性滚动结束 → 防抖后释放滚动锁 */
  const handleMomentumScrollEnd = useCallback(
    (evt: ScrollEvent) => {
      clearTimers()
      scrollEndTimer.current = setTimeout(releaseScroll, SCROLL_RELEASE_MS)
      onMomentumScrollEnd?.(evt)
    },
    [clearTimers, onMomentumScrollEnd, releaseScroll]
  )

  useEffect(() => {
    return () => {
      clearTimers()
      // 卸载时强制释放全局滚动锁, 防止收起中的滚动容器(如 ActionSheet 下拉)卡死全局点击
      uiStore.setScrolling(false)
    }
  }, [clearTimers])

  return {
    handleScroll,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    handleMomentumScrollEnd
  }
}
