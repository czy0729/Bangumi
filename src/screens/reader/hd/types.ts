/*
 * @Author: czy0729
 * @Date: 2022-09-29 06:32:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 06:33:01
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
  cn?: string
}
