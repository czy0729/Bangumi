/*
 * @Author: czy0729
 * @Date: 2022-07-19 15:51:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 10:03:59
 */
import { factory } from '@utils'
import { AnyObject, Navigation, SubjectId } from '@types'
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
  filterEps?: number
  epsThumbs?: any[]
  epsThumbsHeader?: AnyObject
}
