/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:52:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 16:55:38
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteCharacter } from '@types'
import Store from './store'
import { TABS_SELF } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteCharacter>

export type Keys = (typeof TABS_SELF)[number]['key']
