/*
 * @Author: czy0729
 * @Date: 2026-08-17 21:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 21:30:00
 */
import { useCallback, useState } from 'react'
import { uiStore } from '@stores'

import type { LayoutChangeEvent } from 'react-native'
import type { Layout } from 'react-native-tab-view/src/types'

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
export function useTabViewSwipe({
  onSwipeStart,
  onSwipeEnd
}: {
  onSwipeStart?: () => void
  onSwipeEnd?: () => void
}) {
  const [isSwiping, setIsSwiping] = useState(false)

  const handleSwipeStart = useCallback(() => {
    uiStore.setScrolling(true)
    setIsSwiping(true)
    onSwipeStart?.()
  }, [onSwipeStart])

  /** 松手 (settling) 后延时放行纵向拖动, 期间仍拦截点击, 兼顾翻页动画的点击保护 */
  const handleSwipeSettle = useCallback(() => {
    setTimeout(() => {
      setIsSwiping(false)
    }, 150)
  }, [])

  const handleSwipeEnd = useCallback(() => {
    setTimeout(() => {
      setIsSwiping(false)
      onSwipeEnd?.()

      setTimeout(() => {
        uiStore.setScrolling(false)
      }, 0)
    }, 300)
  }, [onSwipeEnd])

  return { isSwiping, handleSwipeStart, handleSwipeSettle, handleSwipeEnd }
}
