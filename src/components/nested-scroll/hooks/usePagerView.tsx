/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 08:30:12
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Platform } from 'react-native'
import { USE_NATIVE_DRIVER } from '@constants'

import type {
  default as PagerView,
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEvent,
  PageScrollStateChangedNativeEvent
} from 'react-native-pager-view'

export function usePagerView({
  initialPage = 0,
  onIndexChange
}: {
  initialPage?: number
  onIndexChange?: (position: number) => void
}) {
  const pagerRef = useRef<PagerView>(null)
  const [activePage, setActivePage] = useState(initialPage)
  const [isIdle, setIdle] = useState(true)

  // 滚动中视野覆盖的页码区间 [左页, 右页]; 仅在跨页时更新, 停稳后清回当前页
  const [scrollRange, setScrollRange] = useState<readonly [number, number]>([
    initialPage,
    initialPage
  ])

  const setPage = useCallback((page: number, animated = true) => {
    if (animated) {
      pagerRef.current?.setPage(page)
    } else {
      pagerRef.current?.setPageWithoutAnimation(page)
    }
    setActivePage(page)
  }, [])

  const offset = useRef(new Animated.Value(0)).current
  const position = useRef(new Animated.Value(initialPage)).current

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: offset,
              position: position
            }
          }
        ],
        {
          // position 为最左可见页, offset 为其右偏比例; 视野覆盖 [position, position+1]
          listener: ({ nativeEvent }) => {
            const { offset, position } = nativeEvent
            const from = position
            const to = offset > 0 ? position + 1 : position

            setScrollRange(prev => (prev[0] === from && prev[1] === to ? prev : [from, to]))
          },
          useNativeDriver: USE_NATIVE_DRIVER
        }
      ),
    [offset, position]
  )

  const onPageSelected = useCallback(
    (e: PagerViewOnPageSelectedEvent) => {
      const { position } = e.nativeEvent
      setActivePage(position)
      if (Platform.OS === 'ios') setIdle(true)

      if (typeof onIndexChange === 'function') onIndexChange(position)
    },
    [onIndexChange]
  )

  const onPageScrollStateChanged = useCallback(
    ({ nativeEvent: { pageScrollState } }: PageScrollStateChangedNativeEvent) => {
      setIdle(pageScrollState === 'idle')
    },
    []
  )

  // 停稳后把保活锚点收回当前页, 滚动中由 onPageScroll 的 listener 实时扩展
  useEffect(() => {
    if (isIdle) {
      setScrollRange(prev =>
        prev[0] === activePage && prev[1] === activePage ? prev : [activePage, activePage]
      )
    }
  }, [isIdle, activePage])

  return {
    pagerRef,
    setPage,
    page: activePage,
    isIdle,
    scrollRange,
    position,
    offset,
    onPageScroll,
    onPageSelected,
    onPageScrollStateChanged
  }
}
