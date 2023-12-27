/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:17:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 17:20:08
 */
import React from 'react'
import { Animated } from 'react-native'
import { styles } from './styles'
import { Props } from './types'

export function TabBarIndicator({ style, scrollX }: Props) {
  return (
    <Animated.View
      key={'indicator'}
      style={[
        styles.indicator,
        style,
        {
          transform: [{ translateX: scrollX }]
        }
      ]}
    />
  )
}
