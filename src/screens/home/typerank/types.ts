/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:49:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 09:04:19
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
  tag: string
  type: SubjectType
}
