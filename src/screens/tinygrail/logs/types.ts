/*
 * @Author: czy0729
 * @Date: 2022-11-09 05:43:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 14:54:10
 */
import type { Navigation } from '@types'
import type Store from './store'
import type { ITEMS_DS, TABS } from './ds'

export type Ctx = {
  $: InstanceType<typeof Store>
  navigation?: Navigation
}

export type TabsTitle = (typeof TABS)[number]['title']

export type ItemsType = (typeof ITEMS_DS)[number]
