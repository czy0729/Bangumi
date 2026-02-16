/*
 * @Author: czy0729
 * @Date: 2022-09-26 21:19:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:10:35
 */
import { GetRouteParams, RouteReviews, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteReviews>
