/*
 * @Author: czy0729
 * @Date: 2024-01-04 17:46:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * TabBar 标识与类型
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { ComponentProps } from 'react'
import type { TabBarProps, TabView } from '@components'
import type { TABS } from '../../../ds'

export const COMPONENT = rc(PARENT, 'TabBar')

/** Tab 路由项 */
export type TabRoute = (typeof TABS)[number]

/** 自定义标签渲染的入参 */
export type RenderLabelProps = Parameters<NonNullable<TabBarProps<TabRoute>['renderLabel']>>[0]

/** TabView 自定义 TabBar 渲染 */
export type RenderTabBar = NonNullable<ComponentProps<typeof TabView>['renderTabBar']>
