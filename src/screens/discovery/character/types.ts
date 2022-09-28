/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:52:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-28 00:16:37
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  userName?: string
}
