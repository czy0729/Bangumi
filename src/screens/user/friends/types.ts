/*
 * @Author: czy0729
 * @Date: 2022-08-07 04:01:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:13:51
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteFriends } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteFriends>

export type Sort = '' | 'percent' | 'recent'
