/*
 * @Author: czy0729
 * @Date: 2026-01-22 22:22:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 07:26:13
 */
import React from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native'
import { stl } from '@utils/utils'

import type { BlockWrapperProps } from './types'

export function Block({
  style,
  dragStartAnimationStyle,
  onLongPress,
  children,
  panHandlers,
  delayLongPress
}: BlockWrapperProps) {
  return (
    <Animated.View
      style={stl(
        {
          alignItems: 'center'
        },
        style,
        dragStartAnimationStyle
      )}
      {...panHandlers}
    >
      <Animated.View>
        <TouchableWithoutFeedback
          delayLongPress={delayLongPress}
          delayPressIn={0}
          onPressIn={onLongPress}
        >
          {children}
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  )
}
