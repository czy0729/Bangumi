/*
 * @Author: czy0729
 * @Date: 2024-03-22 06:01:44
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-22 06:01:44
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
