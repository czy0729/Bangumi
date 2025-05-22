/*
 * @Author: czy0729
 * @Date: 2022-07-21 19:50:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-19 18:06:18
 */
import { Rank } from '@stores/tag/types'
import { GetRouteParams, Override, RouteRank, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteRank>

export type ToolBarKeys = 'list' | 'fixed' | 'fixedPagination' | 'collected'

export type ComputedRank = Override<
  Rank,
  {
    _filter?: number
  }
>

export type SnapshotId = `rank_v2_${string}`
