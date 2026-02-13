/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-04 07:51:21
 */
import React from 'react'
import { Animated } from 'react-native'
import { useObserver } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Touchable } from '../touchable'
import { COMPONENT, DARK_THEME, LIGHT_THEME } from './ds'
import { styles } from './styles'

import type { MaskProps } from './types'

export type { MaskProps }

/** 兼容不同客户端的全屏遮罩 */
export function Mask({ style, linear, onPress }: MaskProps) {
  r(COMPONENT)

  return useObserver(() => (
    <Component id='component-mask'>
      {linear ? (
        <LinearGradient
          style={stl(styles.linear, style)}
          colors={_.select(LIGHT_THEME, DARK_THEME)}
          pointerEvents='none'
        />
      ) : (
        <Animated.View style={stl(styles.mask, style)} pointerEvents='none' />
      )}
      <Touchable style={styles.press} useRN ripple={false} onPress={onPress} />
    </Component>
  ))
}

export default Mask
