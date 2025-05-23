/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:43:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 07:29:09
 */
import { CollectionStatusValue, GetRouteParams, RouteLike, SubjectId, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteLike>

export type CollectionsItem = {
  /** 条目 Id */
  id: SubjectId

  /** 条目名字 */
  name: string

  /** 条目封面 */
  image: string

  /** 条目排名 */
  rank: number

  /** 条目分数 */
  score: number

  /** 用户自己的打分 */
  rate: number

  /** 用户看到多少话 */
  ep: number

  /** 用户观看状态 */
  type: CollectionStatusValue

  /** 用户评论字数 */
  comment: number

  /** 用户私密状态 */
  private: boolean

  /** 用户最后管理与现在差多少天 */
  diff: number

  /** 保留几个标签用于在分类排名补充推荐数据 */
  tags: string[]

  /** 标签推荐值 */
  rec: number
}

export type Relates = Record<SubjectId, CollectionsItem>

export type ListItem = {
  id: SubjectId
  name: string
  image: string
  rate: number
  relates: SubjectId[]
  reasons: number[]
}

export type LikeItem = {
  id: SubjectId
  name: string
  image: string
}
