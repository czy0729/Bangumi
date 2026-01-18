/*
 * @Author: czy0729
 * @Date: 2022-08-07 04:01:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 18:58:32
 */
import type { GetRouteParams, RouteFriends, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteFriends>

export type Sort = '' | 'percent' | 'recent'
