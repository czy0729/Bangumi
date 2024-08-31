/*
 * 用于水平滑动块初次进入时, 减少渲染看不见的区域
 * @Author: czy0729
 * @Date: 2023-01-30 09:26:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-30 09:56:05
 */
import { useCallback, useState } from 'react'
import { _ } from '@stores'

export default function useHorizontalLazy<T>(
  data?: T[] | readonly T[],
  lazyRenderedCount: number = 3,
  x: number = 20
) {
  const [scrolled, setScrolled] = useState(_.isPad)
  const onScroll = useCallback(
    evt => {
      const { x: _x } = evt.nativeEvent.contentOffset
      if (_x >= x) setScrolled(true)
    },
    [x]
  )
  let list: typeof data
  if (data) {
    list = scrolled ? data : data.filter((_item, index) => index < lazyRenderedCount)
  }

  return {
    list,
    scrolled,
    onScroll: scrolled ? undefined : onScroll
  }
}
