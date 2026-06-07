/*
 * @Author: czy0729
 * @Date: 2026-06-06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 20:30:40
 */
import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './styles'

import type { Props } from './types'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

/** 左右滚动遮罩容器 */
export function Mask({
  showMask = true,
  maskWidth = 64,
  leftMaskStyle,
  rightMaskStyle,
  maskColors,
  onLayout,
  children
}: Props) {
  // @ts-ignore
  const rightColors = [...maskColors].reverse()

  return (
    <View onLayout={onLayout}>
      {children}

      {showMask && (
        <>
          <AnimatedLinearGradient
            style={[
              styles.leftMask,
              leftMaskStyle,
              {
                width: maskWidth
              }
            ]}
            colors={maskColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            pointerEvents='none'
          />

          <AnimatedLinearGradient
            style={[
              styles.rightMask,
              rightMaskStyle,
              {
                width: maskWidth
              }
            ]}
            // @ts-ignore
            colors={rightColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            pointerEvents='none'
          />
        </>
      )}
    </View>
  )
}

export { useMask } from './use-mask'
