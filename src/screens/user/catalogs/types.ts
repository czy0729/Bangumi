/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:03:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 05:38:14
 */
import { factory } from '@utils'
import { Navigation, UserId } from '@types'
import Store from './store'
import { TABS } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  userId?: UserId
}

export type TabsLabel = typeof TABS[number]['key']
