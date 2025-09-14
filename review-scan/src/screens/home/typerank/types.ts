/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:49:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-18 13:25:15
 */
import { GetRouteParams, RouteTyperank, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTyperank>
