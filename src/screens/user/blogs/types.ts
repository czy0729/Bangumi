/*
 * @Author: czy0729
 * @Date: 2022-08-19 04:29:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 04:30:48
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
  userId?: UserId
}
