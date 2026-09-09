/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 04:52:09
 */
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Touchable } from '../touchable'
import { useMask } from './hooks'
import { COMPONENT, GRADIENT_DARK, GRADIENT_LIGHT } from './ds'
import { styles } from './styles'

export { useMask, MASK_DURATION } from './hooks'

import type { Props as MaskProps } from './types'
export type { MaskProps }

/** 兼容不同客户端的全屏遮罩 */
export const Mask = observer(({ style, linear, show, onPress }: MaskProps) => {
  r(COMPONENT)

  const { showValue, maskStyle } = useMask(show ?? true)

  if (!showValue) return null

  return (
    <Component id='component-mask'>
      {linear ? (
        <Animated.View style={stl(styles.linear, style, maskStyle)} pointerEvents='none'>
          <LinearGradient
            style={styles.linearInner}
            colors={_.select(GRADIENT_LIGHT, GRADIENT_DARK)}
          />
        </Animated.View>
      ) : (
        <Animated.View style={stl(styles.mask, style, maskStyle)} pointerEvents='none' />
      )}

      <Touchable style={styles.press} ripple={false} onPress={onPress} disabled={show === false} />
    </Component>
  )
})

export default Mask
