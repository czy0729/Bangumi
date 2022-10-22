/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-22 12:48:53
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
  subjectId: SubjectId
  cn?: string
  jp?: string
  data: string[]
  headers: any
}
