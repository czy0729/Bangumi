/*
 * @Author: czy0729
 * @Date: 2022-07-11 16:50:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:36:59
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'
import { TABS_WITH_GAME } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation: Navigation
}

export type PinYinFirstCharacter = {
  [cn: string]: string
}

export type TabLabel = (typeof TABS_WITH_GAME)[number]['title']
