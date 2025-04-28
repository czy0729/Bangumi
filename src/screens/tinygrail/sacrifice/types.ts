/*
 * @Author: czy0729
 * @Date: 2022-11-11 05:28:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-28 22:37:53
 */
import { Characters } from '@stores/tinygrail/types'
import { factory } from '@utils'
import { MonoId, Navigation } from '@types'
import Store from './store'
import { TEMPLES_SORT_DS, USERS_SORT_DS } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  monoId: MonoId
  form?: string
  _props: Partial<Characters>
}

export type TemplesSort = (typeof TEMPLES_SORT_DS)[number]

export type UsersSort = (typeof USERS_SORT_DS)[number]
