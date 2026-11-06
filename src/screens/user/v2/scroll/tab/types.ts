/*
 * @Author: czy0729
 * @Date: 2025-10-23 17:41:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:20:00
 *
 * Tab 与 TabBar 的 Props
 */
import type { Animated } from 'react-native'
import type { OverrideNavigationState, SceneRendererProps } from '@components'
import type { ScrollEvent } from '@types'
import type { HandleRefreshOffset, TabsLabel } from '../../types'

export type Props = {
  /** 当前页 */
  page: number

  /** 滚动位置 */
  scrollY: Animated.Value

  /** 滚动回调 */
  onScroll: (evt?: ScrollEvent) => void

  /** 手势开始回调 */
  onSwipeStart: () => void

  /** 页码变更回调 */
  onIndexChange: (index: number) => void

  /** 刷新时重置列表偏移 */
  onRefreshOffset: HandleRefreshOffset
}

/** TabBar 路由 */
export type TabBarRoute = {
  /** 路由 key */
  key: string

  /** 标签标题 */
  title: TabsLabel
}

/** TabBar 渲染参数 */
export type RenderTabBarProps = SceneRendererProps & {
  /** 导航状态 */
  navigationState: OverrideNavigationState<TabBarRoute>
}

/** TabBar 标签渲染参数 */
export type RenderLabelProps = {
  /** 路由 */
  route: TabBarRoute

  /** 是否选中 */
  focused: boolean
}
