/*
 * @Author: czy0729
 * @Date: 2022-07-18 17:25:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-01 19:11:12
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteTopic } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteTopic>

export type FilterType = '' | 'follow' | 'likes' | 'me' | 'friends'
