/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import React, { memo } from 'react'
import Animated from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENT_DIRECTION } from './ds'

import type { MaskGradientProps } from './types'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

/** 单个渐隐遮罩层, 右侧通过 reverse 反向渐变实现镜像淡出 */
function MaskGradient({
  positionStyle,
  animatedStyle,
  colors,
  width,
  reverse = false
}: MaskGradientProps) {
  const [start, middle, end] = colors

  // 解构重排得到可变元组: 同时满足 LinearGradient.colors 的 readonly 元组类型与 reanimated 包装的 string[] 类型
  const resolvedColors: [string, string, string] = reverse
    ? [end, middle, start]
    : [start, middle, end]

  return (
    <AnimatedLinearGradient
      style={[positionStyle, animatedStyle, { width }]}
      colors={resolvedColors}
      {...GRADIENT_DIRECTION}
      pointerEvents='none'
    />
  )
}

export default memo(MaskGradient)
