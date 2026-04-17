/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:27:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:51:09
 */
import type { GetRouteParams, RouteTags, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTags>
