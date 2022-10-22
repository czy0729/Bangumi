/*
 * @Author: czy0729
 * @Date: 2022-10-22 01:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-22 01:52:45
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
  from?: string
  _id?: string
  _name?: string
  _image?: string
}
