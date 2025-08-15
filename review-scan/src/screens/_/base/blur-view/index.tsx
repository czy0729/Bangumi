/*
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-10 05:40:09
 */
import React from 'react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT, Component } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { Props as BlurViewProps } from './types'

export { BlurViewProps }

/** 毛玻璃 */
export const BlurView = ob(({ style, intensity = 100, children, ...other }: BlurViewProps) => {
  return (
    <Component id='base-blur-view'>
      <ExpoBlurView
        style={style}
        tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK)}
        intensity={intensity}
        {...other}
      >
        {children}
      </ExpoBlurView>
    </Component>
  )
}, COMPONENT)

export default BlurView
