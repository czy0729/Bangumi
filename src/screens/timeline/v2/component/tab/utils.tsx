/*
 * @Author: czy0729
 * @Date: 2025-12-08 06:52:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * TabView 自定义 TabBar 渲染
 */
import { useMemo } from 'react'
import TabBar from './tab-bar'

import type { RenderTabBar, TabRoute } from './tab-bar/ds'

/** 把 tab-view 的 readonly routes 收窄为 TabBar 需要的可变数组 */
function TabBarRenderer(props: Parameters<RenderTabBar>[0]) {
  const { navigationState, ...other } = props
  const { index, routes } = navigationState

  // 引用需稳定, 否则 TabBar 内各 tab 项的 memo 会全部失效
  const state = useMemo(
    () => ({
      index,
      routes: routes as TabRoute[]
    }),
    [index, routes]
  )

  return <TabBar {...other} navigationState={state} />
}

export function renderTabBar(props: Parameters<RenderTabBar>[0]) {
  return <TabBarRenderer {...props} />
}
