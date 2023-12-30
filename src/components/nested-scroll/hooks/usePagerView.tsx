/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 10:59:46
 */
import { useCallback, useMemo, useRef, useState } from 'react'
import { Animated, Platform } from 'react-native'
import type {
  default as PagerView,
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEvent,
  PageScrollStateChangedNativeEvent
} from 'react-native-pager-view'

export function usePagerView({ initialPage = 0, onIndexChange }) {
  const pagerRef = useRef<PagerView>(null)
  const [activePage, setActivePage] = useState(initialPage)
  const [isIdle, setIdle] = useState(true)

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
          useNativeDriver: true
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

  return {
    pagerRef,
    setPage,
    page: activePage,
    isIdle,
    position,
    offset,
    onPageScroll,
    onPageSelected,
    onPageScrollStateChanged
  }
}
