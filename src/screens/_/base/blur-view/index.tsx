/*
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 15:31:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT, Component } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props as BlurViewProps } from './types'
export type { BlurViewProps }

/** 毛玻璃 */
export const BlurView = observer(
  ({ style, intensity = 100, children, ...other }: BlurViewProps) => {
    r(COMPONENT)

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
  }
)

export default BlurView
