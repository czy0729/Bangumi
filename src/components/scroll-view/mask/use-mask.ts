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
export function useMask() {
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

  const maskColors = [
    `rgba(${_.colorPlainRaw.join()}, 1)`,
    `rgba(${_.colorPlainRaw.join()}, 0)`
  ] as const

  return {
    leftMaskStyle,
    rightMaskStyle,
    maskColors,
    handleLayout,
    handleContentSizeChange,
    handleScroll
  }
}
