/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:08:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:51:13
 */
import { GetRouteParams, RouteSearch, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSearch>
