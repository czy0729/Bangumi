/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:01:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-17 13:40:48
 */
import { Id, Loaded, SubjectId, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

type DoubanId = Id

export type DoubanItem = {
  id: DoubanId
  subjectId?: SubjectId
  title: string
  cover: string
  status: number
  content: string
  score: number
  progress: any
  create_time: string
}

export type StateData = {
  list: DoubanItem[]
  _loaded: Loaded
}

export type DoubanStatus = 'mark' | 'doing' | 'done'

export type DoubanCollection = {
  count: number
  start: number
  total: number
  interests: {
    status: DoubanStatus
    rating?: {
      value: number
    }
    tags: string[]
    comment: string
    subject: {
      id: number
      title: string
      pic: {
        normal: string
      }
      type: 'tv' | 'movie'
    }
    create_time: string
  }[]
}
