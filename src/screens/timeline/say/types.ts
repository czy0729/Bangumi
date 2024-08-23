/*
 * @Author: czy0729
 * @Date: 2022-09-29 06:10:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 10:40:43
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteSay } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteSay>
