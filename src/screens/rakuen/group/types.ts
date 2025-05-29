/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:06:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:39:24
 */
import { GetRouteParams, RouteGroup, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteGroup>
