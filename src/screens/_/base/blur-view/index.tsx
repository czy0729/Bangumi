/*
 * 毛玻璃
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-08 23:01:44
 */
import React from 'react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Props as BlurViewProps } from './types'

export { BlurViewProps }

export const BlurView = ob(
  ({ style, intensity = 100, children, ...other }: BlurViewProps) => {
    return (
      <ExpoBlurView
        style={style}
        tint={_.isDark ? 'dark' : 'default'}
        intensity={intensity}
        {...other}
      >
        {children}
      </ExpoBlurView>
    )
  }
)
