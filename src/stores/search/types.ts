/*
 * @Author: czy0729
 * @Date: 2022-07-01 18:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-01 18:55:30
 */
import { ListEmpty, Id, Cover, SubjectType } from '@types'

/** 搜索 */
export type Search = ListEmpty<
  Partial<{
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
  }>
>
