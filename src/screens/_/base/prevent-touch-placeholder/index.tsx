/*
 * 在屏幕左侧硬站位, 通常用于阻止横向 <ScrollView> 的触摸避免印象左滑退后
 *
 * @Author: czy0729
 * @Date: 2022-06-02 06:01:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 14:26:25
 */
import React from 'react'
import { Component } from '@components'
import { styles } from './styles'

export const PreventTouchPlaceholder = () => {
  return (
    <Component id='prevent-touch-placeholder' style={styles.preventTouchPlaceholder} />
  )
}
