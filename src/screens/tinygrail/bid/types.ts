/*
 * @Author: czy0729
 * @Date: 2022-11-08 05:49:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 16:44:16
 */
import { WithNavigation } from '@types'
import Store from './store'
import { TABS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type TabsKeys = (typeof TABS)[number]['key']

export type Params = {
  type?: TabsKeys
}

export type Direction = '' | 'up' | 'down'
