/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:08:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 16:23:46
 */
import type { Animated } from 'react-native'
import type { TextStyle, ViewStyle } from '@types'
import type { Layout, RenderLabel } from '../../types'
export type { Layout }

export interface Props {
  /** 容器样式 */
  style?: ViewStyle

  /** Tab 样式 */
  tabStyle?: ViewStyle

  /** 标签文字样式 */
  labelStyle?: TextStyle

  /** 指示器样式 */
  indicatorStyle?: ViewStyle

  /** 标签页配置列表 */
  tabs: readonly { title: string; key: string }[]

  /** 当前偏移量插值 */
  position: Animated.Value

  /** 滚动偏移量插值 */
  offset: Animated.Value

  /** 当前选中页码 */
  page: number

  /** 是否处于空闲状态 */
  isIdle: boolean

  /** Tab 间距 */
  spacing?: number

  /** 使用本地化加速下一次的 onLayout */
  tabBarLocalKey: string

  /** Tab 栏左侧组件 */
  TabBarLeft?: JSX.Element

  /** 自定义标签渲染函数 */
  renderLabel?: RenderLabel

  /** Tab 点击回调 */
  onTabPress: (index: number) => void

  /** Tab 布局计算完成回调，返回所有 Tab 的位置信息 */
  onTabsLayout?: (layouts: Layout[]) => void
}
