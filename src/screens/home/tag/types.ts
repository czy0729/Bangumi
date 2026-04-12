/*
 * @Author: czy0729
 * @Date: 2022-07-30 03:51:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-12 22:46:29
 */
import type { GetRouteParams, RouteTag, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTag>

export type SnapshotId = `tag_v2_${string}`
