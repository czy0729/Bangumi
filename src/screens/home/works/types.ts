/*
 * @Author: czy0729
 * @Date: 2022-07-31 17:54:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-31 18:36:39
 */
import { factory } from '@utils'
import { PersonId, Navigation } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  monoId: PersonId
  name?: string
}

export type ToolBarKeys = 'list' | 'fixed' | 'collected'
