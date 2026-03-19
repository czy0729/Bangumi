/*
 * @Author: czy0729
 * @Date: 2019-11-30 15:23:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 15:34:47
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView as RNBlurView } from '@react-native-community/blur'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props as BlurViewProps } from './types'
export type { BlurViewProps }

/** 毛玻璃 */
export const BlurView = observer(({ style, children }: BlurViewProps) => {
  r(COMPONENT)

  return (
    <View style={style}>
      <RNBlurView
        style={_.absoluteFill}
        blurAmount={_.select(20, 32)}
        overlayColor={_.select('rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 0.24)')}
      />
      {children}
    </View>
  )
})

export default BlurView
