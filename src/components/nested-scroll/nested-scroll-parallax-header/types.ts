/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 16:17:03
 */
import type { PropsWithChildren } from 'react'
import type { ImageSourcePropType } from 'react-native'
import type { ViewStyle } from '@types'
import type { OverflowComponents, RenderLabel } from '../types'

export type Props = PropsWithChildren<{
  /** 页面配置列表 */
  pages: readonly { title: string; key: string }[]

  /** 初始页码 */
  initialPage?: number

  /** 头部图片高度 */
  imageHeight?: number

  /** 头部图片资源 */
  imageSource?: ImageSourcePropType

  /** 高斯模糊半径 */
  blurRadius?: number

  /** 吸顶高度 */
  stickyHeight?: number

  /** Tab 间距 */
  spacing?: number

  /** 使用本地化加速下一次的 onLayout */
  tabBarLocalKey: string

  /** Tab 容器样式 */
  tabStyle?: ViewStyle

  /** 头部内容组件 */
  HeaderComponent?: JSX.Element

  /** Tab 栏左侧组件 */
  TabBarLeft?: JSX.Element

  /** 背景组件，fixed 表示是否已吸顶 */
  BackgroundComponent?: (fixed?: boolean) => JSX.Element

  /** 自定义标签渲染函数 */
  renderLabel?: RenderLabel

  /** 页面切换回调 */
  onIndexChange?: (position: number) => void
}> &
  OverflowComponents
