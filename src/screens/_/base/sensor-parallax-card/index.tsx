/*
 * @Author: czy0729
 * @Date: 2026-03-10 07:47:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-22 10:00:00
 */
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useActive } from '@utils/hooks'
import { useParallax } from './hooks'
import SensorDriver from './sensor-driver'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as SensorParallaxCardProps } from './types'
export type { SensorParallaxCardProps }

/** 重力视差容器 */
export const SensorParallaxCard = observer(
  ({
    style,
    sensitivity = 0.6,
    enabled = true,
    reverse = false,
    enableRotate = true,
    children
  }: SensorParallaxCardProps) => {
    r(COMPONENT)

    const active = useActive()

    const { values, animatedStyle } = useParallax({ active, enabled, enableRotate })

    return (
      <Animated.View
        style={stl(enableRotate && styles.scale, animatedStyle, style)}
        renderToHardwareTextureAndroid
      >
        {children}
        {active && enabled && (
          <SensorDriver sensitivity={sensitivity} reverse={reverse} {...values} />
        )}
      </Animated.View>
    )
  }
)

export default SensorParallaxCard
