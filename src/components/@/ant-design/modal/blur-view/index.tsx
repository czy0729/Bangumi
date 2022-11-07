/*
 * @Author: czy0729
 * @Date: 2022-11-04 11:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 05:02:20
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { BlurView as RNBlurView } from '@react-native-community/blur'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { _ } from '@stores'
import { IOS } from '@constants'
import { memoStyles } from './styles'
import { Props as BlurViewProps } from './types'

export { BlurViewProps }

export const BlurView = observer(
  ({ style, intensity = 100, children }: BlurViewProps) => {
    const styles = memoStyles()
    if (IOS) {
      return (
        <ExpoBlurView
          style={[styles.blurView, style]}
          tint={_.isDark ? 'dark' : 'light'}
          intensity={intensity}
        >
          {children}
        </ExpoBlurView>
      )
    }

    return (
      <View style={style}>
        <RNBlurView
          style={styles.absolute}
          blurAmount={_.select(20, 32)}
          overlayColor={_.select('rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.24)')}
        />
        {children}
      </View>
    )
  }
)
