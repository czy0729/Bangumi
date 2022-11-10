/*
 * @Author: czy0729
 * @Date: 2022-11-11 05:28:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 05:49:37
 */
import { factory } from '@utils'
import { MonoId, Navigation } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  monoId: MonoId
  form?: string
}
