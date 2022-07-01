/*
 * @Author: czy0729
 * @Date: 2022-06-04 11:11:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-02 00:44:28
 */
import { Cover, ListEmpty, SubjectId } from '@types'

type List = ListEmpty<
  Partial<{
    id: SubjectId
    cover: Cover<'c'>
    name: string
    nameCn: string
    tip: string
    score: string
    total: string
    rank: string
    collected: boolean
  }>
>

/** 标签条目 */
export type Tag = List

/** 排行榜 */
export type Rank = List

/** 索引 */
export type Browser = List
