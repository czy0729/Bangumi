/*
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 22:58:02
 */
import React from 'react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { Component } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Props as BlurViewProps } from './types'

export { BlurViewProps }

/** 毛玻璃 */
export const BlurView = ob(
  ({ style, intensity = 100, children, ...other }: BlurViewProps) => {
    return (
      <Component id='base-blur-view'>
        <ExpoBlurView
          style={style}
          tint={_.isDark ? 'dark' : 'default'}
          intensity={intensity}
          {...other}
        >
          {children}
        </ExpoBlurView>
      </Component>
    )
  }
)
