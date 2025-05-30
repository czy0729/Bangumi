/*
 * @Author: czy0729
 * @Date: 2022-10-22 01:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 19:21:27
 */
import { GetRouteParams, RouteZone, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteZone>
