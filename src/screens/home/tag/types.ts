/*
 * @Author: czy0729
 * @Date: 2022-07-30 03:51:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-18 13:28:07
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteTag } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteTag>

export type SnapshotId = `tag_${string}`
