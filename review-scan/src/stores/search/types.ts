/*
 * @Author: czy0729
 * @Date: 2022-07-01 18:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-01 18:55:30
 */
import { Cover, Id, ListEmpty, SubjectType } from '@types'

export type SearchItem = {
  id: Id
  cover: Cover<'c'>
  name: string
  nameCn: string
  tip: string
  score: string
  total: string
  rank: string
  type: SubjectType
  collected: boolean
  comments: string
}

/** 搜索 */
export type Search = ListEmpty<Partial<SearchItem>>
