/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 21:34:48
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { syncSystemStore, syncThemeStore } from '@utils/async'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from './ds'

import type { BlurTint } from 'expo-blur'
import type { Props } from './types'

function BlurView({ style, children }: Props) {
  const _ = syncThemeStore()
  const systemStore = syncSystemStore()

  const styles = _.create({
    blurView: {
      backgroundColor: _.select('rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.08)'),
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    view: {
      backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
      borderRadius: _.radiusSm,
      borderWidth: _.select(_.hairlineWidth, 0),
      borderColor: _.colorBorder,
      overflow: 'hidden'
    }
  })

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
