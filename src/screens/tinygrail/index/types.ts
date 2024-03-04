/*
 * @Author: czy0729
 * @Date: 2022-11-07 13:55:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 18:04:32
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
  fromBottomTab?: boolean
}
