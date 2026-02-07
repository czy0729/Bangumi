/*
 * @Author: czy0729
 * @Date: 2022-11-08 19:58:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 11:10:39
 */
import { factory } from '@utils'
import Store from './store'

import type { MonoId, Navigation } from '@types'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  monoId?: MonoId
  type?: 'bid' | 'asks'
  form?: 'trade' | 'sacrifice'
}
