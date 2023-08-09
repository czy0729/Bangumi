/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:16:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 04:50:10
 */
import React from 'react'
import { HardwareTextureRootBlurView } from '@components'
import { _ } from '@stores'

/**
 * iOS 是不需要这套逻辑的, 会直接渲染成 View
 *
 * 安卓端会把子层级下的所有 BlurView 渲染到根本的 RootContainer
 */
export const BlurViewRoot = ({ children }) => {
  return (
    <HardwareTextureRootBlurView style={_.container.flex}>
      {children}
    </HardwareTextureRootBlurView>
  )
}
