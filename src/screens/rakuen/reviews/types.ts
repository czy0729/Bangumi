/*
 * @Author: czy0729
 * @Date: 2022-09-26 21:19:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 21:25:31
 */

import { factory } from '@utils'
import { Navigation, SubjectId } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  subjectId?: SubjectId
  name?: string
}
