/*
 * @Author: czy0729
 * @Date: 2023-09-04 04:18:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 19:51:26
 */
import type { ViewStyle } from 'react-native'
import type { WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'

/** 毛玻璃根容器, 用于 Android 声明模糊节点 */
export type HardwareTextureRootBlurViewProps = PropsWithChildren<
  WithViewStyles<{
    /** Android: 唯一节点名称, 用于 BlurRootView 与 BlurView 关联 */
    name?: string
  }>
>

/** 毛玻璃模糊层, 渲染实际高斯模糊效果 */
export type HardwareTextureBlurViewProps = WithViewStyles<{
  /** 模糊层内部容器样式 */
  containerStyle?: ViewStyle

  /** Android: 关联的 BlurRootView 节点名称 */
  name?: string
}>
