/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:27:15
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RoutePreview } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RoutePreview>
