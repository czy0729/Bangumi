/*
 * @Author: czy0729
 * @Date: 2022-07-30 03:51:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-18 13:28:07
 */
import { GetRouteParams, RouteTag, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTag>

export type SnapshotId = `tag_v2_${string}`
