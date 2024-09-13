/*
 * @Author: czy0729
 * @Date: 2022-08-19 04:29:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 06:47:37
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteBlogs } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteBlogs>
