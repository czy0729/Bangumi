/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:55:54
 */
import React from 'react'
import { Animated } from 'react-native'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Touchable } from '../touchable'
import { COMPONENT } from './ds'
import { styles } from './styles'

/** 兼容不同客户端的全屏遮罩 */
export const Mask = ({ style, onPress }) => {
  r(COMPONENT)

  return (
    <Component id='component-mask'>
      {/* @ts-ignore */}
      <Animated.View style={[styles.mask, style]} pointerEvents='none' />
      <Touchable style={styles.press} useRN ripple={false} onPress={onPress} />
    </Component>
  )
}
