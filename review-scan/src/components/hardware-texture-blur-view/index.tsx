/*
 * @Author: czy0729
 * @Date: 2023-08-08 16:38:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-10 05:40:00
 */
import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from '../blur-view'
import { HardwareTextureBlurViewProps, HardwareTextureRootBlurViewProps } from './type'
import { COMPONENT, COMPONENT_ROOT } from './ds'

export { HardwareTextureBlurViewProps, HardwareTextureRootBlurViewProps }

/** 对各个平台高斯模糊层的一个写法、用途、性能的取舍的统合组件 */
export const HardwareTextureRootBlurView = ({
  style = {},
  children
}: HardwareTextureRootBlurViewProps) => {
  r(COMPONENT_ROOT)

  return <View style={stl(_.container.flex, style)}>{children}</View>
}

export const HardwareTextureBlurView = ({
  style = {},
  containerStyle = {}
}: HardwareTextureBlurViewProps) => {
  r(COMPONENT)

  return (
    <Animated.View style={style} pointerEvents='none' removeClippedSubviews>
      <BlurView
        style={{
          height: _.flatten(style)?.height || '100%',
          ...containerStyle
        }}
        tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK)}
        intensity={100}
      />
    </Animated.View>
  )
}
