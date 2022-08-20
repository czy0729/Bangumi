/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:22:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-20 15:46:14
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
  userName?: string
}
