/*
 * @Author: czy0729
 * @Date: 2026-10-26 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-26 00:00:00
 *
 * Tab 相关类型
 */
import type { ComponentProps } from 'react'
import type { TabBarProps, TabView } from '@components'
import type { TABS } from '../../ds'

/** Tab 路由项 */
export type TabRoute = (typeof TABS)[number]

/** TabBar 自定义标签渲染 */
export type RenderLabel = NonNullable<TabBarProps<TabRoute>['renderLabel']>

/** TabView 自定义 TabBar 渲染 */
export type RenderTabBar = NonNullable<ComponentProps<typeof TabView>['renderTabBar']>

/** 自定义 TabBar 属性, 与 renderTabBar 的入参保持一致 */
export type Props = Parameters<RenderTabBar>[0]
