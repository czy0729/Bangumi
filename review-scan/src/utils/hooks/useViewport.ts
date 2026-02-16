/*
 * @Author: czy0729
 * @Date: 2023-04-19 10:25:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:35:04
 */
import { useCallback, useState } from 'react'

export default function useViewport() {
  const [visibleTop, setVisibleTop] = useState(false)
  const [visibleBottom, setVisibleBottom] = useState<false | number>(false)
  const onScroll = useCallback(({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent
    const screenHeight = layoutMeasurement.height
    setVisibleTop(contentOffset.y)
    setVisibleBottom(contentOffset.y + screenHeight)
  }, [])

  return {
    visibleTop,
    visibleBottom,
    onScroll
  }
}
