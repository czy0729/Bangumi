/*
 * @Author: czy0729
 * @Date: 2022-07-21 19:50:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-19 18:06:18
 */
import { Rank } from '@stores/tag/types'
import { factory } from '@utils'
import { GetRouteParams, Navigation, Override, RouteRank } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteRank>

export type ToolBarKeys = 'list' | 'fixed' | 'fixedPagination' | 'collected'

export type ComputedRank = Override<
  Rank,
  {
    _filter?: number
  }
>

export type SnapshotId = `rank_v2_${string}`
