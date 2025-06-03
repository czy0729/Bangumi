/*
 * @Author: czy0729
 * @Date: 2022-11-11 05:28:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-28 22:37:53
 */
import { Characters } from '@stores/tinygrail/types'
import { MonoId, WithNavigation } from '@types'
import Store from './store'
import { AUCTIONS_SORT_DS, TEMPLES_SORT_DS, USERS_SORT_DS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = {
  monoId: MonoId
  form?: string
  _props: Partial<Characters>
}

export type AuctionsSort = (typeof AUCTIONS_SORT_DS)[number]

export type TemplesSort = (typeof TEMPLES_SORT_DS)[number]

export type UsersSort = (typeof USERS_SORT_DS)[number]
