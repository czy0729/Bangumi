/*
 * @Author: czy0729
 * @Date: 2022-09-26 21:19:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 */
import type { GetRouteParams, RouteReviews, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteReviews>
