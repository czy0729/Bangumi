/*
 * @Author: czy0729
 * @Date: 2026-03-12 04:57:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:35:42
 */
import React, { useEffect } from 'react'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Touchable } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconSensorProps } from './types'
export type { IconSensorProps }

export const IconSensor = observer(
  ({
    enabled,
    onPress,
    spreadDistance = 6.5,
    shapeSize = 14,
    rotationAngle = 45,
    tiltAngle = 55
  }: IconSensorProps) => {
    r(COMPONENT)

    const progress = useSharedValue(enabled ? 0 : 1)

    useEffect(() => {
      progress.value = withTiming(enabled ? 0 : 1, {
        duration: 640,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1)
      })
    }, [enabled, progress])

    // 父容器控制：只负责“往用户倾斜”的透视效果
    const containerStyle = useAnimatedStyle(
      () =>
        ({
          transform: [
            { perspective: 400 },
            { rotateX: `${interpolate(progress.value, [0, 1], [tiltAngle, 0])}deg` }
          ]
        } as const)
    )

    // 图层控制：只负责“位移”和“菱形旋转”
    const getLayerStyle = (index: number) => {
      return useAnimatedStyle(() => {
        const yOffsets = [-spreadDistance, 0, spreadDistance]
        const translateY = interpolate(progress.value, [0, 1], [yOffsets[index], 0])

        return {
          opacity: interpolate(progress.value, [0, 1], [0.9 - index * 0.3, 0.2]),
          // 关键点：位移在前，旋转在后，这样旋转永远是绕自身中心进行的
          transform: [{ translateY }, { rotateZ: `${rotationAngle}deg` }]
        } as const
      })
    }

    return (
      <Touchable style={styles.touch} onPress={onPress}>
        <Animated.View
          style={[
            {
              width: shapeSize,
              height: shapeSize
            },
            containerStyle
          ]}
        >
          {[2, 1, 0].map(layerIndex => (
            <Animated.View
              key={layerIndex}
              style={[
                styles.shape,
                { width: shapeSize, height: shapeSize },
                getLayerStyle(layerIndex),
                { zIndex: 3 - layerIndex }
              ]}
            />
          ))}
        </Animated.View>
      </Touchable>
    )
  }
)

export default IconSensor
