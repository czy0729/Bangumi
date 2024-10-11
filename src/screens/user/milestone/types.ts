/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 05:06:27
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteMilestone } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteMilestone>
