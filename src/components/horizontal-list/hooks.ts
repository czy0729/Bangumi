/*
 * @Author: czy0729
 * @Date: 2026-08-19 08:05:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 08:05:11
 */
import { useCallback, useMemo, useRef, useState } from 'react'
import { getListData } from './utils'

import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import type { WithId } from './types'
import type { UseHorizontalListOptions, UseHorizontalListResult } from './types'

/** 水平列表滚动状态与数据逻辑 */
export function useHorizontalList<T extends WithId>({
  data,
  sortData = true,
  initialRenderNums = 0,
  scrolled: initialScrolled = false,
  onEndReachedOnce
}: UseHorizontalListOptions<T>): UseHorizontalListResult<T> {
  const [scrolled, setScrolled] = useState(initialScrolled)
  const endReachedRef = useRef(false)

  const memoData = useMemo(
    () => getListData(data, sortData, initialRenderNums, scrolled),
    [data, sortData, initialRenderNums, scrolled]
  )

  const handleScroll = useCallback(
    (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!scrolled) setScrolled(true)

      // onEndReachedOnce 回调
      if (!endReachedRef.current && onEndReachedOnce) {
        const { x } = evt.nativeEvent.contentOffset
        const contentW = evt.nativeEvent.contentSize.width
        const scrollViewW = evt.nativeEvent.layoutMeasurement.width
        if (scrollViewW + x + 20 >= contentW) {
          onEndReachedOnce()
          endReachedRef.current = true
        }
      }
    },
    [scrolled, onEndReachedOnce]
  )

  return { scrolled, memoData, handleScroll }
}
