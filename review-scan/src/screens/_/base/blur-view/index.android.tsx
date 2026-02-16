/*
 * 毛玻璃
 *
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 02:51:15
 */
import React from 'react'
import { View } from 'react-native'
import { BlurView as RNBlurView } from '@react-native-community/blur'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as BlurViewProps } from './types'

export { BlurViewProps }

export const BlurView = ob(({ style, children }: BlurViewProps) => {
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
})

export default BlurView
