/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { syncSystemStore, syncThemeStore } from '@utils/async'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from '../../blur-view/ds'
import { memoStyles } from './styles'

import type { BlurTint } from 'expo-blur'
import type { Props } from './types'

const _ = syncThemeStore()

const systemStore = syncSystemStore()

function BlurView({ style, intensity = 100, children }: Props) {
  const styles = memoStyles()

  if (systemStore.blurModal) {
    return (
      <ExpoBlurView
        style={[styles.blurView, style]}
        tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK) as BlurTint}
        intensity={intensity}
      >
        {children}
      </ExpoBlurView>
    )
  }

  return <View style={[style, styles.view]}>{children}</View>
}

export default observer(BlurView)
