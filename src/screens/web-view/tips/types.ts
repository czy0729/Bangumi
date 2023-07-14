/*
 * @Author: czy0729
 * @Date: 2023-06-23 14:19:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-13 07:06:42
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'

const f = factory(Store)

export type Params = {
  key?: string
}

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}
