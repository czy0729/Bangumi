/*
 * @Author: czy0729
 * @Date: 2026-11-21 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-21 03:00:00
 */
import React from 'react'
import { Animated } from 'react-native'
import { styles } from './styles'

import type { StyleProp, TextStyle } from 'react-native'

interface TabBarItemLabelProps {
  color: string
  label?: string
  labelStyle: StyleProp<TextStyle>
  icon: React.ReactNode
}

const TabBarItemLabel = React.memo(({ color, label, labelStyle, icon }: TabBarItemLabelProps) => {
  if (!label) {
    return null
  }

  return (
    <Animated.Text
      style={[styles.label, icon ? { marginTop: 0 } : null, labelStyle, { color: color }]}
    >
      {label}
    </Animated.Text>
  )
})

export default TabBarItemLabel
