/*
 * @Author: czy0729
 * @Date: 2024-07-10 16:10:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 05:30:39
 */
import type { ReactNode } from 'react'
import type { Route, SceneRendererProps } from 'react-native-tab-view'
import type { OverrideNavigationState } from '@components/tab-view'
import type { TabsKeys } from '../../types'

export type Props = {
  /** Tab 页签 keys */
  keys: TabsKeys[]
}

/** 场景渲染函数 */
export type RenderScene = (props: SceneRendererProps & { route: Route }) => ReactNode

/** Tab 主体属性 */
export type TabProps = {
  /** 场景渲染函数 */
  renderScene: RenderScene
}

/** Tab 栏渲染属性 */
export type RenderTabBarProps = SceneRendererProps & {
  navigationState: OverrideNavigationState<Route>
}
