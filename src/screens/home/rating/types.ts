/*
 * @Author: czy0729
 * @Date: 2022-07-19 15:51:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 11:16:33
 */
import { factory } from '@utils'
import { CollectionStatus, Navigation, SubjectId, SubjectTypeCn } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  subjectId: SubjectId
  status?: CollectionStatus
  name?: string
  type?: SubjectTypeCn
}
