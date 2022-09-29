/*
 * @Author: czy0729
 * @Date: 2022-09-29 16:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:06:35
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
  blogId: Id
  _title?: string
  _time?: string
  _avatar?: string
  _userId?: string
  _userName?: string
  _url?: string
}
