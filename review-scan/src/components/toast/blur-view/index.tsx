/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:52:06
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { syncSystemStore, syncThemeStore } from '@utils/async'
import { IOS } from '@constants/constants'
import { WEB } from '@constants/device'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from './ds'
import { Props } from './types'

export default observer(({ style, children }: Props) => {
  const _ = syncThemeStore()
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
  const systemStore = syncSystemStore()
  if (IOS || WEB || (!IOS && systemStore.setting.androidBlur && systemStore.setting.blurToast)) {
    return (
      <ExpoBlurView
        style={[style, styles.blurView]}
        tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK)}
        intensity={64}
      >
        {children}
      </ExpoBlurView>
    )
  }

  return <View style={[style, styles.view]}>{children}</View>
})
