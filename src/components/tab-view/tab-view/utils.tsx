/*
 * @Author: czy0729
 * @Date: 2026-08-17 22:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 22:00:00
 */
import { memo } from 'react'
import { Pager } from 'react-native-tab-view/src/Pager'
import { TabBar } from 'react-native-tab-view/src/TabBar'

import type { Route, SceneRendererProps } from 'react-native-tab-view/src/types'
import type { OverrideNavigationState } from './types'

/** 稳定的懒加载占位默认值，避免每次渲染生成新的函数引用 */
export const defaultRenderLazyPlaceholder = () => null

/** 稳定的 Tab 栏默认渲染，避免每次渲染生成新的函数引用 */
// 只读 routes 与 TabBar 期望的可变数组不兼容
export const defaultRenderTabBar = (
  props: SceneRendererProps & { navigationState: OverrideNavigationState<Route> }
  // @ts-expect-error
) => <TabBar {...props} />

/** 缓存 Pager，isSwiping 等状态切换时不重渲染场景子树 */
export const MemoPager = memo(Pager) as unknown as typeof Pager
