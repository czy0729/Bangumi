/*
 * @Author: czy0729
 * @Date: 2022-11-04 11:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 04:55:55
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { syncSystemStore, syncThemeStore } from '@utils/async'
import { stl } from '@utils/utils'
import { IOS } from '@constants/constants'
import { WEB } from '@constants/device'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from '../../../ds'
import { memoStyles } from './styles'

import type { Props } from './types'

const _ = syncThemeStore()
const systemStore = syncSystemStore()

function BlurView({ style, intensity = 100, children }: Props) {
  const styles = memoStyles()

  if (IOS || WEB || (!IOS && systemStore.setting.androidBlur && systemStore.setting.blurModal)) {
    return (
      <ExpoBlurView
        style={stl(styles.blurView, style)}
        tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK)}
        intensity={intensity}
      >
        {children}
      </ExpoBlurView>
    )
  }

  return <View style={stl(style, styles.view)}>{children}</View>
}

export default observer(BlurView)
