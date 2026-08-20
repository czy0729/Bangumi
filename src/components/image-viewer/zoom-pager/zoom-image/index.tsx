/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 20:05:01
 */
import React, { memo } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { stl } from '@utils'
import { useZoomImage } from './hooks'
import { styles } from './styles'

import type { Props } from './types'

/**
 * 手势图片容器 (内联重写 react-native-image-pan-zoom, PanResponder 实现)
 */
function ZoomImage({ children, style, ...other }: Props) {
  const { panHandlers, animatedStyle } = useZoomImage(other)

  return (
    <View
      {...panHandlers}
      style={stl(styles.container, style, { width: other.cropWidth, height: other.cropHeight })}
    >
      <Animated.View style={animatedStyle} renderToHardwareTextureAndroid>
        <View style={{ width: other.imageWidth, height: other.imageHeight }}>{children}</View>
      </Animated.View>
    </View>
  )
}

export default memo(ZoomImage)
