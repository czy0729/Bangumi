/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:03:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 15:16:22
 *
 * 页面上下文与标签类型
 */
import type { GetRouteParams, RouteCatalogs, WithNavigation } from '@types'
import type Store from './store'
import type { TABS } from './ds'

export type Ctx = WithNavigation<{
  /** 页面 store */
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteCatalogs>

export type TabsItem = (typeof TABS)[number]

export type TabsKey = TabsItem['key']
