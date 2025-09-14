/*
 * @Author: czy0729
 * @Date: 2022-11-08 15:19:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-24 20:45:51
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteTinygrailCharaAssets } from '@types'
import Store from './store'
import { DATA, TABS } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteTinygrailCharaAssets>

export type Direction = '' | 'down' | 'up'

export type TabsKey = (typeof TABS)[number]['key']

export type BatchAction = (typeof DATA)[number] | ''
