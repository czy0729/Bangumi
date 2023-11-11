/*
 * @Author: czy0729
 * @Date: 2022-06-02 06:01:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 00:03:55
 */
import React from 'react'
import { Component } from '@components'
import { styles } from './styles'

/** 在屏幕左侧占位, 用于阻止横向 ScrollView 的触摸边缘左滑导致退后 */
export const PreventTouchPlaceholder = () => {
  return (
    <Component
      id='base-prevent-touch-placeholder'
      style={styles.preventTouchPlaceholder}
    />
  )
}
