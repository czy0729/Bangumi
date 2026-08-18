/*
 * @Author: czy0729
 * @Date: 2024-07-10 15:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 05:30:33
 */
import TabBar from './tab-bar'

import type { RenderTabBarProps } from './types'

/** 渲染 Tab 栏，展开只读 routes 为可变数组以兼容 TabBar */
export function renderTabBar(props: RenderTabBarProps) {
  return (
    <TabBar
      {...props}
      navigationState={{ ...props.navigationState, routes: [...props.navigationState.routes] }}
    />
  )
}
