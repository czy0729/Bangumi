/*
 * @Author: czy0729
 * @Date: 2022-08-04 16:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 19:25:59
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteUser } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteUser>
