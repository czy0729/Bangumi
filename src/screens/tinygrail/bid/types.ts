/*
 * @Author: czy0729
 * @Date: 2022-11-08 05:49:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 06:36:04
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'
import { tabs } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type TabsKeys = typeof tabs[number]['key']

export type Params = {
  type?: TabsKeys
}
