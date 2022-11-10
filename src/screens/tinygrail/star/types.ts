/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:48:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-09 06:48:19
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
