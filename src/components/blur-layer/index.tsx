/*
 * @Author: czy0729
 * @Date: 2026-11-26 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-26 12:00:00
 *
 * 自研模糊层 (Android): 一份共享抓取 + 多实例采样
 *  - 原生可用时走 BangumiBlurRootView / BangumiBlurView
 *  - 不可用时退化为普通 View (无模糊), 不抛错
 */
import React from 'react'
import { View } from 'react-native'
import { NativeBlurLayer, NativeBlurRootView } from './native'

import type { BlurLayerProps, BlurRootViewProps } from './types'
export type { BlurLayerProps, BlurRootViewProps }
export {
  isNativeBlurAvailable,
  isNativeBlurLayerAvailable,
  isNativeBlurRootAvailable
} from './native'

/** 模糊根容器 */
export function BlurRootView({ name, style, children }: BlurRootViewProps) {
  if (!NativeBlurRootView) return <View style={style}>{children}</View>

  return (
    <NativeBlurRootView name={name} style={style}>
      {children}
    </NativeBlurRootView>
  )
}

/** 模糊层 */
export function BlurLayer({
  blurNode,
  radius = 10,
  overlayColor = 0,
  style,
  children
}: BlurLayerProps) {
  if (!NativeBlurLayer) return <View style={style}>{children}</View>

  return (
    <NativeBlurLayer
      blurNode={blurNode}
      radius={radius}
      overlayColor={overlayColor}
      style={style}
    >
      {children}
    </NativeBlurLayer>
  )
}

export default BlurLayer
