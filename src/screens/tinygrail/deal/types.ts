/*
 * @Author: czy0729
 * @Date: 2022-11-08 19:58:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 11:10:39
 */
import type { GetRouteParams, RouteTinygrailDeal, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTinygrailDeal>
