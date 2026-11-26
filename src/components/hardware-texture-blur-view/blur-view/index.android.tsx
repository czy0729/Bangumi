/*
 * @Author: czy0729
 * @Date: 2023-08-08 16:38:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 02:00:00
 */
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { BlurLayer } from '../../blur-layer'
import { COMPONENT, DEFAULT_NODE_NAME } from '../ds'

import type { ViewStyle } from 'react-native'
import type { HardwareTextureBlurViewProps } from '../type'

/**
 * 模糊半径 (0~25)
 *
 * 采样是整屏 1/8 位图, 半径在采样图上是 1:1 的, 换算到屏幕要 ×8:
 * 24 等于 192px 的采样半径, 会把模糊层外 192px 内的内容也混进来,
 * 边缘外有色块出现/消失时整块模糊会跟着变; 调小可以减轻, 但模糊会变弱
 */
const BLUR_RADIUS = 16

/** 上下边缘用纯色块收边, 遮住模糊层的硬边 (px) */
const EDGE_HEIGHT = 2

const styles = {
  edgeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: EDGE_HEIGHT
  } as ViewStyle,
  edgeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: EDGE_HEIGHT
  } as ViewStyle
}

/** 毛玻璃模糊层, 渲染实际高斯模糊效果 */
export const HardwareTextureBlurView = ({
  style,
  containerStyle,
  name = DEFAULT_NODE_NAME,
  edgeTop = false,
  edgeBottom = false,
  edgeColor
}: HardwareTextureBlurViewProps) => {
  r(COMPONENT)

  return (
    <Animated.View style={style} pointerEvents='none' removeClippedSubviews>
      <BlurLayer blurNode={name} radius={BLUR_RADIUS} style={_.absoluteFill}>
        <View
          style={stl(
            {
              height: _.flatten(style)?.height || '100%'
            },
            containerStyle
          )}
          removeClippedSubviews
          pointerEvents='none'
        />
      </BlurLayer>
      {edgeTop && !!EDGE_HEIGHT && (
        <View
          style={[styles.edgeTop, { backgroundColor: edgeColor || _.colorBg }]}
          pointerEvents='none'
        />
      )}
      {edgeBottom && !!EDGE_HEIGHT && (
        <View
          style={[styles.edgeBottom, { backgroundColor: edgeColor || _.colorBg }]}
          pointerEvents='none'
        />
      )}
    </Animated.View>
  )
}
