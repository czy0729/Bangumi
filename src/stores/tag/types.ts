/*
 * @Author: czy0729
 * @Date: 2022-06-04 11:11:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-02 00:44:28
 */
import type { HTML_RANK_V2 } from '@constants'
import type { BrowserSort, ListEmpty, Override, SubjectId, SubjectType, TagOrder } from '@types'
import type { LOADED } from './init'

export type CacheKey = keyof typeof LOADED

/** 标签、排行榜、索引公用项 */
export type TagItem = {
  id: SubjectId
  cover: string
  name: string
  nameCn: string
  tip: string
  score: string
  total: string
  rank: string
  collected: boolean
}

/** 标签条目 */
export type Tag = Override<
  ListEmpty<TagItem>,
  {
    /** 是否允许公共标签筛选 */
    meta?: boolean
  }
>

/** 排行榜 */
export type Rank = ListEmpty<TagItem>

/** 索引 */
export type Browser = ListEmpty<TagItem>

export type FetchTagArgs = {
  /** 关键字 */
  text: string

  /** 类型 */
  type?: SubjectType

  /** 排序 */
  order?: TagOrder

  /** 时间 */
  airtime?: string

  /** 公共标签 */
  meta?: boolean
}

export type FetchRankArgs = Parameters<typeof HTML_RANK_V2>[0]

export type FetchBrowserArgs = {
  type?: SubjectType
  airtime?: string
  sort?: BrowserSort
}
