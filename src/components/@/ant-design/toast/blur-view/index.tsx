/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 16:02:51
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { syncThemeStore } from '@utils/async'
import { IOS, STORYBOOK } from '@constants'
import { Props } from './types'

export const BlurView = observer(({ style, children }: Props) => {
  const _ = syncThemeStore()
  if (IOS || STORYBOOK) {
    return (
      <ExpoBlurView
        style={[
          style,
          // eslint-disable-next-line react-native/no-inline-styles
          {
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
  }

  return (
    <View
      style={[
        style,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: _.isDark ? _._colorDarkModeLevel2 : _.colorPlain,
          borderRadius: _.radiusSm,
          borderWidth: _.isDark ? 0 : _.hairlineWidth,
          borderColor: _.colorBorder,
          overflow: 'hidden'
        }
      ]}
    >
      {children}
    </View>
  )
})
