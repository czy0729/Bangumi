/*
 * @Author: czy0729
 * @Date: 2024-07-20 09:31:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 11:21:56
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
