/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:27:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:41:06
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteTags } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteTags>
