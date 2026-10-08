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
import { isAnimationDisabled } from '@utils/animation'
import { syncSystemStore, syncThemeStore } from '@utils/async'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from '../../blur-view/ds'
import { memoStyles } from './styles'

import type { Props } from './types'

const _ = syncThemeStore()
const systemStore = syncSystemStore()

function BlurView({ style, intensity = 100, children }: Props) {
  const styles = memoStyles()

  // 系统关闭动画时不使用 expo-blur: 保证主框体一定被绘制
  if (systemStore.blurModal && !isAnimationDisabled()) {
    return (
      <ExpoBlurView
        style={[styles.blurView, style]}
        tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK)}
        intensity={intensity}
      >
        {children}
      </ExpoBlurView>
    )
  }

  return <View style={[style, styles.view]}>{children}</View>
}

export default observer(BlurView)
