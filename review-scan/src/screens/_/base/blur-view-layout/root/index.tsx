/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:16:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-01 23:37:02
 */
import React from 'react'
import { HardwareTextureRootBlurView } from '@components'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { COMPONENT } from './ds'

/**
 * iOS 是不需要这套逻辑的, 会直接渲染成 View
 *
 * 安卓端会把子层级下的所有 BlurView 渲染到根本的 RootContainer
 */
export const BlurViewRoot = ({ children }) => {
  r(COMPONENT)

  if (IOS || !(systemStore.setting.androidBlur && systemStore.setting.blurBottomTabs)) {
    return children
  }

  return (
    <HardwareTextureRootBlurView style={_.container.flex}>{children}</HardwareTextureRootBlurView>
  )
}

export default BlurViewRoot
