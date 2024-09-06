/*
 * @Author: czy0729
 * @Date: 2022-07-31 17:54:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-06 00:41:03
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteWorks } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteWorks>

export type ToolBarKeys = 'list' | 'fixed' | 'collected'
