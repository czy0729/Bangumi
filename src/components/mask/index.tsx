/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 12:00:00
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

  /**
   * 内置淡入淡出只服务受控的 show
   * - 不传 show 时不参与动画: 否则会与调用方自己驱动的 opacity (例如 ActionSheet 用 progress 驱动)
   *   写在同一个 Animated.View 上互相覆盖, 两段动画时长还不一致, 逐帧数值跳变表现为遮罩闪烁
   * - 调用方 style 放最后, 保证显式传入的样式优先
   */
  const fadeStyle = show === undefined ? undefined : maskStyle

  if (!showValue) return null

  return (
    <Component id='component-mask'>
      {linear ? (
        <Animated.View style={stl(styles.linear, fadeStyle, style)} pointerEvents='none'>
          <LinearGradient
            style={styles.linearInner}
            colors={_.select(GRADIENT_LIGHT, GRADIENT_DARK)}
          />
        </Animated.View>
      ) : (
        <Animated.View style={stl(styles.mask, fadeStyle, style)} pointerEvents='none' />
      )}

      <Touchable style={styles.press} ripple={false} onPress={onPress} disabled={show === false} />
    </Component>
  )
})

export default Mask
