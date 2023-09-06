/*
 * @Author: czy0729
 * @Date: 2023-08-08 16:38:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 20:41:14
 */
import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurRootView, BlurView } from 'react-native-realtimeblurview'
import { _ } from '@stores'
import { stl } from '@utils'

const DEFAULT_NODE_NAME = 'HardwareTextureRootBlurView'

export const HardwareTextureRootBlurView = ({
  style = {},
  name = DEFAULT_NODE_NAME,
  children
}) => {
  return (
    <BlurRootView style={stl(_.container.flex, style)} name={name}>
      {children}
    </BlurRootView>
  )
}

export const HardwareTextureBlurView = ({
  style = {},
  containerStyle = {},
  name = DEFAULT_NODE_NAME
}) => {
  return (
    <Animated.View style={style} pointerEvents='none' removeClippedSubviews>
      <BlurView blurNode={name} radius={24}>
        <View
          style={{
            // @ts-expect-error
            height: style?.height || '100%',
            ...containerStyle
          }}
          removeClippedSubviews
          pointerEvents='none'
        />
      </BlurView>
    </Animated.View>
  )
}
