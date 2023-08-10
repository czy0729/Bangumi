/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:16:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 19:25:50
 */
import React from 'react'
import { View } from 'react-native'
import { HardwareTextureRootBlurView } from '@components'
import { _, systemStore } from '@stores'
import { IOS } from '@constants'

/**
 * iOS 是不需要这套逻辑的, 会直接渲染成 View
 *
 * 安卓端会把子层级下的所有 BlurView 渲染到根本的 RootContainer
 */
export const BlurViewRoot = ({ children }) => {
  const { androidBlur, blurBottomTabs } = systemStore.setting
  if (IOS || !(androidBlur && blurBottomTabs)) {
    return <View style={_.container.flex}>{children}</View>
  }

  return (
    <HardwareTextureRootBlurView style={_.container.flex}>
      {children}
    </HardwareTextureRootBlurView>
  )
}
