/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:22:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 16:47:20
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteUserTimeline } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteUserTimeline>
