/*
 * @Author: czy0729
 * @Date: 2022-11-04 11:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-10 05:38:36
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { syncSystemStore, syncThemeStore } from '@utils/async'
import { stl } from '@utils/utils'
import { IOS } from '@constants/constants'
import { STORYBOOK } from '@constants/device'
import { Props as BlurViewProps } from './types'

export { BlurViewProps }

export const BlurView = observer(({ style, intensity = 100, children }: BlurViewProps) => {
  const _ = syncThemeStore()
  const styles = _.create({
    blurView: {
      paddingTop: 20,
      backgroundColor: _.select('rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.08)'),
      borderRadius: _.radiusMd,
      borderWidth: 0,
      overflow: 'hidden'
    },
    view: {
      paddingTop: 20,
      backgroundColor: _.select(_.colorPlain, _.deep(_._colorDarkModeLevel1, _._colorPlain)),
      borderRadius: _.radiusMd,
      borderWidth: 0,
      overflow: 'hidden'
    }
  })
  const systemStore = syncSystemStore()
  if (
    IOS ||
    STORYBOOK ||
    (!IOS && systemStore.setting.androidBlur && systemStore.setting.blurModal)
  ) {
    return (
      <ExpoBlurView
        style={stl(styles.blurView, style)}
        tint={_.select('extraLight', 'dark')}
        intensity={intensity}
      >
        {children}
      </ExpoBlurView>
    )
  }

  return <View style={stl(style, styles.view)}>{children}</View>
})
