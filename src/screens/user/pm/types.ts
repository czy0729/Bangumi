/*
 * @Author: czy0729
 * @Date: 2022-08-19 08:45:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 10:54:39
 */
import { factory } from '@utils'
import { Id, Navigation, UserId } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  userId?: UserId
  id?: Id
  userName?: string
}
