/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:55:25
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-02-19 07:55:25
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
