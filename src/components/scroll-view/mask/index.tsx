/*
 * @Author: czy0729
 * @Date: 2026-06-06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 22:18:55
 */
import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { PAD } from '@constants'
import { DEFAULT_MASK_WIDTH } from './ds'
import { styles } from './styles'

import type { Props } from './types'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

/** 左右滚动遮罩容器 */
export function Mask({
  showMask = true,
  maskWidth = DEFAULT_MASK_WIDTH,
  maskColors,
  leftMaskStyle,
  rightMaskStyle,
  onLayout,
  children
}: Props) {
  // @ts-ignore
  const rightColors = [...maskColors].reverse()

  /**
   * 遮罩层宽度
   *  - 若 maskWidth >= DEFAULT_MASK_WIDTH 则认为是占满横屏的组件，需要补偿倍率宽度
   *  - _.wind - _._wind 为平板设备两侧预留间距，在手机上永远为 0
   */
  const maskWidthValue =
    maskWidth + _.device(0, maskWidth >= DEFAULT_MASK_WIDTH ? (_.wind - _._wind) * (PAD + 1) : 0)

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
                width: maskWidthValue
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
                width: maskWidthValue
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
