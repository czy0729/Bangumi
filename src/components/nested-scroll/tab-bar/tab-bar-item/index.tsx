/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:22:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 17:23:30
 */
import React from 'react'
import { Animated, Pressable } from 'react-native'
import { styles } from './styles'
import { Props } from './types'

export function TabBarItem({ title, style, labelStyle, onPress, onLayout }: Props) {
  return (
    <Pressable style={[styles.tab, style]} onPress={onPress} onLayout={onLayout}>
      <Animated.Text style={[styles.label, labelStyle]}>{title}</Animated.Text>
    </Pressable>
  )
}
