/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 07:04:29
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteWordCloud } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteWordCloud>

export type SnapshotId = `extract_${string}`

export type TrendId = `trend_${string}`
