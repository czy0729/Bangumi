/*
 * @Author: czy0729
 * @Date: 2022-07-31 17:54:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:59:40
 */
import type { GetRouteParams, RouteWorks, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteWorks>

export type ToolBarKeys = 'list' | 'fixed' | 'collected'
