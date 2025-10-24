/*
 * @Author: czy0729
 * @Date: 2022-08-04 16:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 21:34:08
 */
import type { GetRouteParams, RouteUser, WithNavigation } from '@types'
import type Store from './store'
import type { TABS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteUser>

export type TabsKeys = (typeof TABS)[number]['key']

export type TabsLabel = (typeof TABS)[number]['title']

export type HandleRefreshOffset = (offsets?: number | number[]) => void
