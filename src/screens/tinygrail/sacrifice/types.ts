/*
 * @Author: czy0729
 * @Date: 2022-11-11 05:28:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:22:02
 */
import type { Characters } from '@stores/tinygrail/types'
import type { MonoId, WithNavigation } from '@types'
import type Store from './store'
import type { AUCTIONS_SORT_DS, TEMPLES_SORT_DS, USERS_SORT_DS } from './ds'

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
