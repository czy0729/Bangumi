/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:01:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 10:30:00
 *
 * 页面数据结构
 */
import type { Id, Loaded, SubjectId, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

type DoubanId = Id

export type DoubanItem = {
  /** 条目 Id */
  id: DoubanId

  /** 条目 Id, 需要匹配过才存在 */
  subjectId?: SubjectId

  /** 标题 */
  title: string

  /** 封面 */
  cover: string

  /** 条目状态 */
  status: number

  /** 短评 */
  content: string

  /** 评分 */
  score: number

  /** 看到第几话 */
  progress?: string | number

  /** 创建时间 */
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

export type { CollectionInfo, ApiCollectionResponse as CollectionResponse } from '@types'
