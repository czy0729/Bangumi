/*
 * @Author: czy0729
 * @Date: 2023-08-08 16:38:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-09 00:21:19
 */
import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurRootView, BlurView } from 'react-native-realtimeblurview'

const DEFAULT_NODE_NAME = 'HardwareTextureRootBlurView'

export const HardwareTextureRootBlurView = ({
  style,
  name = DEFAULT_NODE_NAME,
  children
}) => {
  return (
    // @ts-expect-error
    <BlurRootView style={style} name={name}>
      {children}
    </BlurRootView>
  )
}

export const HardwareTextureBlurView = ({
  style,
  containerStyle = {},
  name = DEFAULT_NODE_NAME
}) => {
  return (
    <Animated.View style={style} pointerEvents='none' removeClippedSubviews>
      {/* @ts-expect-error */}
      <BlurView blurNode={name} radius={24}>
        <View
          style={{
            height: style.height,
            ...containerStyle
          }}
          removeClippedSubviews
          pointerEvents='none'
        />
      </BlurView>
    </Animated.View>
  )
}
