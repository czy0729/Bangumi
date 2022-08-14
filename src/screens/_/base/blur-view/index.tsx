/*
 * 毛玻璃
 *
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 13:17:57
 */
import React from 'react'
import { View } from 'react-native'
import { BlurView as RNBlurView } from '@react-native-community/blur'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { styles } from './styles'
import { Props as BlurViewProps } from './types'

export { BlurViewProps }

export const BlurView = ob(({ style, intensity = 100, children }: BlurViewProps) => {
  if (IOS) {
    return (
      <ExpoBlurView
        style={[_.container.flex, style]}
        tint={_.isDark ? 'dark' : 'default'}
        intensity={intensity}
      >
        {children}
      </ExpoBlurView>
    )
  }

  return (
    <View style={[_.container.flex, style]}>
      <RNBlurView
        style={styles.absolute}
        blurAmount={_.select(20, 32)}
        overlayColor={_.select('rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.24)')}
      />
      {children}
    </View>
  )
})
