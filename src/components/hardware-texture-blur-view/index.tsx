/*
 * @Author: czy0729
 * @Date: 2023-08-08 16:38:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-04 04:49:11
 */
import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { stl } from '@utils'
import { HardwareTextureBlurViewProps, HardwareTextureRootBlurViewProps } from './type'

export { HardwareTextureBlurViewProps, HardwareTextureRootBlurViewProps }

export const HardwareTextureRootBlurView = ({
  style = {},
  children
}: HardwareTextureRootBlurViewProps) => {
  return <View style={stl(_.container.flex, style)}>{children}</View>
}

export const HardwareTextureBlurView = ({
  style = {},
  containerStyle = {}
}: HardwareTextureBlurViewProps) => {
  return (
    <Animated.View style={style} pointerEvents='none' removeClippedSubviews>
      <BlurView
        style={{
          height: _.flatten(style)?.height || '100%',
          ...containerStyle
        }}
        tint={_.select('light', 'dark')}
        intensity={100}
      />
    </Animated.View>
  )
}
