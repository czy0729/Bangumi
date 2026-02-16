/*
 * @Author: czy0729
 * @Date: 2022-11-11 02:28:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 04:22:25
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
  monoId?: MonoId
  form?: string
}
