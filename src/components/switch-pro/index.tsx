/*
 * @Author: czy0729
 * @Date: 2020-06-24 22:32:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 00:23:08
 *
 * iOS / Web 端实现: 手势拖动 + 进度动画的自绘开关
 */
import React from 'react'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { useSwitch } from './hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as SwitchProProps } from './types'
export type { SwitchProProps }

export const SwitchPro = observer((props: SwitchProProps) => {
  r(COMPONENT)

  const { style, circleStyle, backgroundActive, backgroundInactive, ...rest } = props
  const { width, height, panHandlers, containerAnimatedStyle, circleAnimatedStyle } = useSwitch({
    ...rest,
    backgroundActive: backgroundActive || _.colorSuccess,
    backgroundInactive: backgroundInactive || _.select(_.colorBg, _._colorDarkModeLevel2)
  })

  return (
    <Component id='component-switch-pro'>
      <Animated.View
        {...panHandlers}
        style={stl(
          styles.container,
          {
            width,
            height,
            borderRadius: height / 2
          },
          containerAnimatedStyle,
          style
        )}
      >
        <Animated.View style={stl(circleAnimatedStyle, circleStyle)} />
      </Animated.View>
    </Component>
  )
})

export default SwitchPro
