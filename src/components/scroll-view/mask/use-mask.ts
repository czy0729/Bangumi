/*
 * @Author: czy0729
 * @Date: 2026-06-06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 00:46:05
 */
import { useCallback, useMemo } from 'react'
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { _ } from '@stores'
import { getMaskColors } from './utils'

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

  /**
   * 遮罩颜色
   *  - 依赖 rgb 的"值"而不是颜色数组的引用: 主题切换后颜色变了必须重算, 用引用比较不可靠
   *    (曾经导致切主题后遮罩还是旧颜色 —— 引用没被判定为变化, useMemo 就永远不重算,
   *    下游 memo(MaskGradient) 拿到恒定引用也不重渲染)
   *  - 值不变时 rgb 字符串不变, useMemo 不重算 → 引用保持稳定, memo(MaskGradient) 的优化依然有效
   * */
  const rgb = (color || _.colorPlainRaw).join()
  const maskColors = useMemo(() => getMaskColors(rgb), [rgb])

  return {
    leftMaskStyle,
    rightMaskStyle,
    maskColors,
    handleLayout,
    handleContentSizeChange,
    handleScroll
  }
}
