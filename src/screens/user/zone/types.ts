/*
 * @Author: czy0729
 * @Date: 2022-10-22 01:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 19:21:27
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteZone } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteZone>
