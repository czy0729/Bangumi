/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 22:21:00
 */
import React from 'react'
import { Animated } from 'react-native'
import { Component } from '../component'
import { Touchable } from '../touchable'
import { styles } from './styles'

/** 兼容不同客户端的全屏遮罩 */
export const Mask = ({ style, onPress }) => {
  return (
    <Component id='component-mask'>
      {/* @ts-ignore */}
      <Animated.View style={[styles.mask, style]} />
      <Touchable style={styles.press} useRN ripple={false} onPress={onPress} />
    </Component>
  )
}
