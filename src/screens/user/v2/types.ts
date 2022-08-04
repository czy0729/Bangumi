/*
 * @Author: czy0729
 * @Date: 2022-08-04 16:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-04 17:29:10
 */
import { factory } from '@utils'
import { Navigation, UserId } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  userId: UserId
}
