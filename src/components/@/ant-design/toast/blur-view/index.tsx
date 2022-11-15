/* eslint-disable react-native/no-inline-styles */
/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-16 04:11:14
 */
import React from 'react'
import { Platform, View } from 'react-native'
import { observer } from 'mobx-react-lite'
// import { BlurView as RNBlurView } from '@react-native-community/blur'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { getThemeStoreAsync } from '@utils/async'
import { Props } from './types'

export const BlurView = observer(({ style, children }: Props) => {
  const _ = getThemeStoreAsync()
  if (Platform.OS === 'ios') {
    return (
      <ExpoBlurView
        style={[
          style,
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
        {
          backgroundColor: _.isDark ? _._colorDarkModeLevel2 : _.colorPlain,
          borderRadius: _.radiusSm,
          borderWidth: _.isDark ? 0 : _.hairlineWidth,
          borderColor: _.colorBorder,
          overflow: 'hidden'
        }
      ]}
    >
      {/* <RNBlurView
        style={styles.absolute}
        blurAmount={_.isDark ? 32 : 20}
        overlayColor={_.isDark ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.5)'}
      /> */}
      {children}
    </View>
  )
})
