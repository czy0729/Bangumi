/*
 * @Author: czy0729
 * @Date: 2026-08-12 11:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 11:00:00
 */
import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { getWidth } from './utils'

import type { LayoutChangeEvent } from 'react-native'

/** 进入动画时长 (ms) */
const APPEAR_DURATION = 1000

/** 进度条宽度状态与进入动画 */
export const useProgress = (percent: number, wrapWidth?: number, appearTransition = false) => {
  const [layoutWidth, setLayoutWidth] = useState(wrapWidth || 0)
  const widthSource = wrapWidth || layoutWidth || Dimensions.get('window').width
  const targetWidth = getWidth(widthSource, percent)

  const progressWidth = useSharedValue(targetWidth)
  useEffect(() => {
    if (appearTransition) {
      progressWidth.value = withTiming(targetWidth, { duration: APPEAR_DURATION })
    } else {
      progressWidth.value = targetWidth
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appearTransition, targetWidth])

  const animatedStyle = useAnimatedStyle(() => ({
    width: progressWidth.value
  }))

  const handleLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width
    if (!wrapWidth) setLayoutWidth(width)
  }

  return { targetWidth, animatedStyle, handleLayout }
}
