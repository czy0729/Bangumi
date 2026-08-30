/*
 * @Author: czy0729
 * @Date: 2023-01-30 09:26:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 08:43:43
 */
import { useCallback, useState } from 'react'
import { _ } from '@stores'

import type { ScrollEvent } from '@types'

/** 用于水平滑动块初次进入时, 减少渲染看不见的区域 */
export default function useHorizontalLazy<T extends readonly U[], U = T[number]>(
  data: readonly U[] = [],
  lazyRenderedCount: number = 3,
  x: number = 20
) {
  const [scrolled, setScrolled] = useState(_.isPad)

  const list: readonly U[] = scrolled ? data : data.slice(0, lazyRenderedCount)

  const handleScroll = useCallback(
    (evt: ScrollEvent) => {
      if (evt.nativeEvent.contentOffset.x >= x) setScrolled(true)
    },
    [x]
  )

  return {
    /** 实际渲染的列表 (未滚动过时为前 `lazyRenderedCount` 条) */
    list,

    /** 是否已滚动过 (滚动后渲染完整列表) */
    scrolled,

    /** 滚动监听, 已滚动过后返回 `undefined` 不再监听 */
    onScroll: scrolled ? undefined : handleScroll
  }
}
