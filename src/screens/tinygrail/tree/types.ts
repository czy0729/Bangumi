/*
 * @Author: czy0729
 * @Date: 2022-11-09 07:14:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 01:30:16
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
  name?: string
}
