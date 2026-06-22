/*
 * @Author: czy0729
 * @Date: 2023-08-08 16:38:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 20:31:15
 */
import { View } from 'react-native'
import { BlurView } from 'react-native-realtimeblurview'
import Animated from 'react-native-reanimated'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT, DEFAULT_NODE_NAME } from '../ds'

import type { HardwareTextureBlurViewProps } from '../type'

/** 毛玻璃模糊层, 渲染实际高斯模糊效果 */
export const HardwareTextureBlurView = ({
  style,
  containerStyle,
  name = DEFAULT_NODE_NAME
}: HardwareTextureBlurViewProps) => {
  r(COMPONENT)

  return (
    <Animated.View style={style} pointerEvents='none' removeClippedSubviews>
      <BlurView blurNode={name} radius={24}>
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
      </BlurView>
    </Animated.View>
  )
}
