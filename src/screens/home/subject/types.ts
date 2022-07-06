/*
 * @Author: czy0729
 * @Date: 2022-07-04 15:40:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:01:12
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'

const f = factory(Store)

export type Ctx = {
  $: typeof f
  navigation?: Navigation
}
