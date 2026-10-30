/*
 * @Author: czy0729
 * @Date: 2025-01-26 20:36:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * TabView 自定义 TabBar 渲染
 */
import TabBar from './tab-bar'

import type { TabBarProps } from '@components'
import type { RenderTabBar, TabRoute } from './tab-bar/ds'

export function renderTabBar(props: Parameters<RenderTabBar>[0]) {
  // Route 的 title 可选, 这里按 TABS 收窄后传给 TabBar
  return <TabBar {...(props as TabBarProps<TabRoute>)} />
}
