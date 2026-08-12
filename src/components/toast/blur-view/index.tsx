/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 01:35:11
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { syncSystemStore, syncThemeStore } from '@utils/async'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from './ds'
import { memoStyles } from './styles'

import type { BlurTint } from 'expo-blur'
import type { Props } from './types'

function BlurView({ style, children }: Props) {
  const _ = syncThemeStore()
  const systemStore = syncSystemStore()
  const styles = memoStyles()

  if (systemStore.blurToast) {
    return (
      <ExpoBlurView
        style={[style, styles.blurView]}
        tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK) as BlurTint}
        intensity={64}
      >
        {children}
      </ExpoBlurView>
    )
  }

  return <View style={[style, styles.view]}>{children}</View>
}

export default observer(BlurView)
