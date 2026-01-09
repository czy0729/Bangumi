/*
 * @Author: czy0729
 * @Date: 2022-07-11 16:50:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-09 17:42:16
 */
import type { UserCollectionsItem } from '@stores/collection/types'
import type { UserCollectionItem } from '@stores/user/types'
import type { WithNavigation } from '@types'
import type Store from './store'
import type { TABS_ITEM } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Tabs = (typeof TABS_ITEM)[keyof typeof TABS_ITEM][]

export type TabsKeys = Tabs[number]['key']

export type TabsLabel = Tabs[number]['title']

export type ItemType = UserCollectionItem | UserCollectionsItem
