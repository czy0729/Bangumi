/*
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 07:12:30
 */
import React from 'react'
import { View } from 'react-native'
import { BlurView as RNBlurView } from '@react-native-community/blur'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Props as BlurViewProps } from './types'

export type { BlurViewProps }

/** 毛玻璃 */
export function BlurView({ style, children }: BlurViewProps) {
  r(COMPONENT)

  return useObserver(() => (
    <View style={style}>
      <RNBlurView
        style={_.absoluteFill}
        blurAmount={_.select(20, 32)}
        overlayColor={_.select('rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.24)')}
      />
      {children}
    </View>
  ))
}

export default BlurView
