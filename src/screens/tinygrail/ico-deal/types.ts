/*
 * @Author: czy0729
 * @Date: 2022-11-08 18:16:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 18:19:32
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
}
