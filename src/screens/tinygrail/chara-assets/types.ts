/*
 * @Author: czy0729
 * @Date: 2022-11-08 15:19:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 15:50:23
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
  message?: string
  form?: 'lottery' | undefined
}
