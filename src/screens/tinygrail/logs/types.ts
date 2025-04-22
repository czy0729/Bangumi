/*
 * @Author: czy0729
 * @Date: 2022-11-09 05:43:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-21 23:37:15
 */
import { Navigation } from '@types'
import Store from './store'
import { ITEMS_DS, TABS } from './ds'

export type Ctx = {
  $: InstanceType<typeof Store>
  navigation?: Navigation
}

export type TabsTitle = (typeof TABS)[number]['title']

export type ItemsType = (typeof ITEMS_DS)[number]
