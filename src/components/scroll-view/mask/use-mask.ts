/*
 * @Author: czy0729
 * @Date: 2026-06-06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 16:53:31
 */
import { useCallback } from 'react'
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { _ } from '@stores'

import type { LayoutChangeEvent, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'

/** 水平滚动遮罩 hook */
export function useMask(color: readonly [string, string, string]) {
  const scrollX = useSharedValue(0)
  const contentWidth = useSharedValue(0)
  const containerWidth = useSharedValue(0)

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      containerWidth.value = e.nativeEvent.layout.width
    },
    [containerWidth]
  )

  const handleContentSizeChange = useCallback(
    (w: number) => {
      contentWidth.value = w
    },
    [contentWidth]
  )

  const handleScroll = useCallback(
    (evt: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollX.value = evt.nativeEvent.contentOffset.x
    },
    [scrollX]
  )

  const leftMaskStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, [0, 20], [0, 1], Extrapolation.CLAMP)
  }))

  const rightMaskStyle = useAnimatedStyle(() => {
    const maxScroll = contentWidth.value - containerWidth.value
    return {
      opacity: interpolate(scrollX.value, [maxScroll - 20, maxScroll], [1, 0], Extrapolation.CLAMP)
    }
  })

  // 3色渐变：opaque → 低alpha过渡 → 全透明
  // 避免 2 色线性插值在接近透明时 RGB 残留导致的"脏边"断层
  const rgb = (color || _.colorPlainRaw).join()
  const maskColors = [`rgba(${rgb}, 1)`, `rgba(${rgb}, 0.06)`, `rgba(${rgb}, 0)`] as const

  return {
    leftMaskStyle,
    rightMaskStyle,
    maskColors,
    handleLayout,
    handleContentSizeChange,
    handleScroll
  }
}
