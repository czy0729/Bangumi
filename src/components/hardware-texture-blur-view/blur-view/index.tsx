/*
 * @Author: czy0729
 * @Date: 2023-08-08 16:38:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 20:03:32
 */
import React from 'react'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from '../ds'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from '../../blur-view'

import type { BlurTint } from 'expo-blur'
import type { HardwareTextureBlurViewProps } from '../type'

/** 毛玻璃模糊层, 渲染实际高斯模糊效果 */
export const HardwareTextureBlurView = ({
  style,
  containerStyle
}: HardwareTextureBlurViewProps) => {
  r(COMPONENT)

  return (
    <Animated.View style={style} pointerEvents='none' removeClippedSubviews>
      <BlurView
        style={stl(
          {
            height: _.flatten(style)?.height || '100%'
          },
          containerStyle
        )}
        tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK) as BlurTint}
        intensity={100}
      />
    </Animated.View>
  )
}
