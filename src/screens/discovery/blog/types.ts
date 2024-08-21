/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:47:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:29:02
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteDiscoveryBlog, SubjectType } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteDiscoveryBlog>

export type BlogType = SubjectType | 'all'
