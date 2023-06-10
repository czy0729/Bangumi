/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:43:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-11 00:25:24
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

export type CollectionsItem = {
  id: SubjectId
  name: string
  image: string
  rank: number
  score: number
  rate: number
}
