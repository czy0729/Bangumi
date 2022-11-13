/* eslint-disable react-native/no-inline-styles */
/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-13 05:38:57
 */
import React from 'react'
import { Platform, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { BlurView as RNBlurView } from '@react-native-community/blur'
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
    <View style={style}>
      <RNBlurView
      // style={styles.absolute}
      // blurAmount={_.select(20, 32)}
      // overlayColor={_.select('rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.24)')}
      />
      {children}
    </View>
  )
})
