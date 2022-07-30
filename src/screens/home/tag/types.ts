/*
 * @Author: czy0729
 * @Date: 2022-07-30 03:51:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 04:05:57
 */
import { factory } from '@utils'
import { Navigation, SubjectType } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  airtime?: string
  type?: SubjectType
  tag?: string
}
