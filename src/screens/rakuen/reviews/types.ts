/*
 * @Author: czy0729
 * @Date: 2022-09-26 21:19:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:10:35
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteReviews } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteReviews>
