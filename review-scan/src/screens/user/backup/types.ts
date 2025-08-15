/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-06 20:45:23
 */
import { CollectionStatusValue, SubjectId, SubjectTypeValue, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

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
