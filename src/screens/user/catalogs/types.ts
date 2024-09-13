/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:03:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:34:31
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteCatalogs } from '@types'
import Store from './store'
import { TABS } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteCatalogs>

export type TabsLabel = (typeof TABS)[number]['key']
