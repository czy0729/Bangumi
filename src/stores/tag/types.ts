/*
 * @Author: czy0729
 * @Date: 2022-06-04 11:11:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-02 00:44:28
 */
import { Cover, ListEmpty, Override, SubjectId } from '@types'

export type TagItem = {
  id: SubjectId
  cover: Cover<'c'>
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
