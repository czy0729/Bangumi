/*
 * @Author: czy0729
 * @Date: 2022-11-09 05:43:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 16:47:43
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

export type TabsTitle = (typeof TABS)[number]['title']
