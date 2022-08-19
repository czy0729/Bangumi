/*
 * @Author: czy0729
 * @Date: 2022-08-19 15:33:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-20 05:14:42
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

export type TabsKey = typeof TABS[number]['key']

export type TabsLabel = typeof TABS[number]['title']

export type Params = {
  type?: TabsKey
}

export type PMKeys = 'pmIn' | 'pmOut'
