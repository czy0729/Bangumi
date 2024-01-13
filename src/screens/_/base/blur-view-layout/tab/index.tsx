/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:26:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:08:14
 */
import React from 'react'
import { View } from 'react-native'
import { HardwareTextureBlurView } from '@components'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

/**
 * TabView 顶部的毛玻璃背景
 *  - iOS 因渲染原因, 会渲染一个等同于 Tabs 长度的毛玻璃做占位
 *  - 安卓是正常布局
 */
export const BlurViewTab = ob(({ length }) => {
  const styles = memoStyles()
  const { androidBlur, blurBottomTabs } = systemStore.setting
  if (!IOS && !(androidBlur && blurBottomTabs)) {
    return <View style={[styles.android, styles.view]} removeClippedSubviews pointerEvents='none' />
  }

  return (
    <HardwareTextureBlurView
      style={_.ios(
        [
          styles.ios,
          {
            left: -_.window.width * length
          }
        ],
        styles.android
      )}
    />
  )
}, COMPONENT)
