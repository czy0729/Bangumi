/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:08:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:22:08
 */
import type { GetRouteParams, RouteSearch, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSearch>
