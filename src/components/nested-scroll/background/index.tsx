/*
 * @Author: czy0729
 * @Date: 2026-03-14 05:54:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 17:34:34
 */
import React from 'react'
import { Animated } from 'react-native'
import { styles } from './styles'

import type { Props } from './types'

export function Background({ height, scroll, children }: Props) {
  return (
    <Animated.View
      style={[
        styles.background,
        {
          height,
          transform: [
            {
              translateY: scroll.interpolate({
                inputRange: [0, height],
                outputRange: [0, -height],
                extrapolate: 'clamp'
              })
            }
          ]
        }
      ]}
    >
      {children}
    </Animated.View>
  )
}
