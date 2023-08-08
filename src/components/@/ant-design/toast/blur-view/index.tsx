/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 17:49:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { syncThemeStore } from '@utils/async'
import { Props } from './types'

export const BlurView = observer(({ style, children }: Props) => {
  const _ = syncThemeStore()
  return (
    <ExpoBlurView
      style={[
        style,
        {
          marginBottom: _.window.height * 0.12,
          backgroundColor: _.isDark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(255, 255, 255, 0.4)',
          borderRadius: _.radiusMd,
          overflow: 'hidden'
        }
      ]}
      tint={_.isDark ? 'dark' : 'light'}
      intensity={64}
    >
      {children}
    </ExpoBlurView>
  )
})
