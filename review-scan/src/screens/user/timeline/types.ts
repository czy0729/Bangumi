/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:22:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 16:47:20
 */
import { GetRouteParams, RouteUserTimeline, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteUserTimeline>
