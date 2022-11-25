/*
 * @Author: czy0729
 * @Date: 2022-11-23 09:53:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-24 17:48:03
 */
import { factory } from '@utils'
import { Id, Navigation, SubjectId } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  subjectId: SubjectId
  name?: string
}

export type Item = {
  show?: boolean
  uuid: Id
  name: string
  url: string
  sort: Id
  active: 0 | 1
}
