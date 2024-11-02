/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-02 11:11:14
 */
import { factory } from '@utils'
import {
  Cover,
  CoverCrt,
  GetRouteParams,
  Id,
  Loaded,
  Navigation,
  RouteWordCloud,
  SubjectId,
  UserId
} from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteWordCloud>

export type CutList = [string, string][]

export type CutType = '标签' | '制作人员' | '声优' | '排名'

export type SnapshotId = `extract_${string}`

export type TrendId = `trend_${string}`

export type SnapshotSubjectsItem = {
  id: SubjectId
  image: Cover<'c'>
  name: string
  name_cn: string
  rank: number
  rating: {
    score: number
  }
  tags: {
    name: string
    count: string
    meta: boolean
  }[]
  character: {
    id: number
    name: string
    nameJP: string
    image: CoverCrt<'g'>
    desc: string
    actorId: number
  }[]
  staff: {
    id: number
    name: string
    nameJP: string
    image: CoverCrt<'g'>
    desc: string
  }[]
  _loaded?: Loaded
}

export type SelectedCommentItem = {
  id: Id
  avatar: string
  userId: UserId
  userName: string
  comment: string
  time: string
  action?: string
}
