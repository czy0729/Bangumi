/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-08 11:14:39
 */
import { factory } from '@utils'
import { CollectionStatusValue, Navigation, SubjectId, SubjectTypeValue } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Item = {
  type: CollectionStatusValue | ''
  rate: number | ''
  ep_status: number | ''
  vol_status: number | ''
  comment: string
  tags: string[]
  private: boolean
  updated_at: string
  subject: {
    id: SubjectId
    date: string
    eps: number | ''
    image: string
    jp: string
    cn: string
    rank: number | ''
    score: number | ''
    type: SubjectTypeValue
  }
}
