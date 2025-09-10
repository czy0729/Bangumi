/*
 * @Author: czy0729
 * @Date: 2022-07-01 18:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-10 11:48:43
 */
import { Id, ListEmpty, SearchCat, SubjectType } from '@types'

export type SearchItem = {
  id: Id
  cover: string
  name: string
  nameCn: string
  tip: string
  score: string
  total: string
  rank: string
  type: SubjectType | ''
  collected: boolean
  comments: string
}

/** 搜索 */
export type Search = ListEmpty<Partial<SearchItem>>

export type FetchSearchArgs = {
  text: string
  cat?: SearchCat

  /** legacy = 1 为精准匹配 */
  legacy?: any
}
