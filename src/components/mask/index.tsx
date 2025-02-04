/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-04 07:51:21
 */
import React from 'react'
import { Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { Component } from '../component'
import { Touchable } from '../touchable'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { MaskProps } from './types'

export { MaskProps }

/** 兼容不同客户端的全屏遮罩 */
export const Mask = ({ style, linear, onPress }: MaskProps) => {
  r(COMPONENT)

  return (
    <Component id='component-mask'>
      {linear ? (
        <LinearGradient
          style={stl(styles.linear, style)}
          colors={[
            `rgba(${_.colorPlainRaw.join()}, 0)`,
            `rgba(${_.colorPlainRaw.join()}, ${_.select(0.75, 0.5)})`,
            `rgba(${_.colorPlainRaw.join()}, 1)`
          ]}
          pointerEvents={IOS ? 'none' : 'auto'}
        />
      ) : (
        <Animated.View style={stl(styles.mask, style)} pointerEvents={IOS ? 'none' : 'auto'} />
      )}
      <Touchable style={styles.press} useRN ripple={false} onPress={onPress} />
    </Component>
  )
}

export default Mask
