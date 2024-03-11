/*
 * @Author: czy0729
 * @Date: 2022-11-08 17:45:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 08:42:12
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'
import { TABS } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type TabsKey = (typeof TABS)[number]['key']
