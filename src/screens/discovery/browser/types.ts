/*
 * @Author: czy0729
 * @Date: 2022-07-26 22:56:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 05:29:21
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
