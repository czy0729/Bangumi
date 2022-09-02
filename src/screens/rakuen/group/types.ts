/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:06:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 04:28:14
 */
import { factory } from '@utils'
import { Id, Navigation } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  groupId: Id
  _title?: string
}
