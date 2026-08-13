/*
 * @Author: czy0729
 * @Date: 2026-08-12 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 10:00:00
 */
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Touchable } from '../../touchable'

import type { DotProps } from './types'

/** 激活态宽度 (px) */
const DOT_ACTIVE_WIDTH = 24

/** 未激活宽度 (px) */
const DOT_WIDTH = 8

/** 动画时长 (ms) */
const ANIMATION_DURATION = 200

/** 单个分页圆点, 激活时宽度过渡 */
function Dot({ active, styles, dotStyle, dotActiveStyle, onPress }: DotProps) {
  const width = useSharedValue(active ? DOT_ACTIVE_WIDTH : DOT_WIDTH)

  useEffect(() => {
    width.value = withTiming(active ? DOT_ACTIVE_WIDTH : DOT_WIDTH, {
      duration: ANIMATION_DURATION
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const animatedStyle = useAnimatedStyle(() => ({ width: width.value }))

  return (
    <Touchable onPress={onPress} withoutFeedback hitSlop={6}>
      <Animated.View
        style={[
          styles.pointStyle,
          styles.spaceStyle,
          dotStyle,
          animatedStyle,
          active && styles.pointActiveStyle,
          active && dotActiveStyle
        ]}
      />
    </Touchable>
  )
}

export default Dot
