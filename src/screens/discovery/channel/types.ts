/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:23:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 14:24:25
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
  type?: SubjectType
}
