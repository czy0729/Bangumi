/*
 * @Author: czy0729
 * @Date: 2022-08-19 08:45:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-06 02:12:09
 */
import type { GetRouteParams, RoutePM, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RoutePM>
