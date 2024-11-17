/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:06:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:33:43
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteBoard } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteBoard>
