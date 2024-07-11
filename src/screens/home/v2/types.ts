/*
 * @Author: czy0729
 * @Date: 2022-07-11 16:50:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-10 16:10:46
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'
import { TABS_ITEM } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation: Navigation
}

export type PinYinFirstCharacter = {
  [cn: string]: string
}

export type Tabs = (typeof TABS_ITEM)[keyof typeof TABS_ITEM][]

export type TabsKeys = (typeof TABS_ITEM)[keyof typeof TABS_ITEM]['key']

export type TabsLabel = (typeof TABS_ITEM)[keyof typeof TABS_ITEM]['title']

export type EpsItem = {
  id: any
  sort: number
  url: any
  name: any
  name_cn: any
  duration: any
  airdate: any
  desc: any
}
