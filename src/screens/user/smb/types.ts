/*
 * @Author: czy0729
 * @Date: 2022-10-30 04:26:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-30 04:27:01
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
