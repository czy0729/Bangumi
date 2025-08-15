/*
 * @Author: czy0729
 * @Date: 2022-07-31 17:54:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-06 00:41:03
 */
import { GetRouteParams, RouteWorks, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteWorks>

export type ToolBarKeys = 'list' | 'fixed' | 'collected'
