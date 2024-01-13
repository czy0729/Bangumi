/*
 * @Author: czy0729
 * @Date: 2022-06-02 06:01:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:48:46
 */
import React from 'react'
import { Component } from '@components'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'

/** 在屏幕左侧占位, 用于阻止横向 ScrollView 的触摸边缘左滑导致退后 */
export const PreventTouchPlaceholder = ob(
  () => <Component id='base-prevent-touch-placeholder' style={styles.preventTouchPlaceholder} />,
  COMPONENT
)
