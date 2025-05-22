/*
 * @Author: czy0729
 * @Date: 2022-07-11 16:50:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-10 16:10:46
 */
import { WithNavigation } from '@types'
import Store from './store'
import { TABS_ITEM } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Tabs = (typeof TABS_ITEM)[keyof typeof TABS_ITEM][]

export type TabsKeys = Tabs[number]['key']

export type TabsLabel = Tabs[number]['title']

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
