/*
 * @Author: czy0729
 * @Date: 2023-08-10 03:36:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 19:24:31
 */
import React from 'react'
import { View } from 'react-native'
import { HardwareTextureBlurView } from '@components'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

/**
 * 底部 Tab 毛玻璃背景
 *
 * iOS 使用正常 expo-blur 作为背景即可
 *
 * 安卓底部 Tab 毛玻璃背景, 为什么会这么写, 因为要满足几个不会触发问题的条件:
 * - 不使用 expo-blur, 因为同一页面多个 expo-blur 会触发 native-stack 过渡动画闪屏;
 * - 这个 react-native-realtimeblurview 库有一个小问题, 就是底部 Tab 高度不够, 会导致他不够模糊,
 *   而距离底部 1pt, 这个问题又好了, 所以给底部增加 1pt 防止这个问题;
 */
export const BlurViewBottomTab = ob(() => {
  const styles = memoStyles()
  const { androidBlur, blurBottomTabs } = systemStore.setting
  if (!(androidBlur && blurBottomTabs)) {
    return (
      <View
        style={[styles.bottomTab, styles.view]}
        removeClippedSubviews
        pointerEvents='none'
      />
    )
  }

  return (
    <>
      <HardwareTextureBlurView
        style={styles.bottomTab}
        containerStyle={styles.container}
      />
      <View style={styles.placeholder} />
    </>
  )
})
