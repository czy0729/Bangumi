/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-29 17:44:01
 */
import type {
  Cover,
  CoverCrt,
  GetRouteParams,
  Id,
  Loaded,
  RouteWordCloud,
  SubjectId,
  UserId,
  WithNavigation
} from '@types'
import type Store from './store'
import type { CUT_TYPE } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteWordCloud>

export type CutList = [string, string][]

export type CutType = typeof CUT_TYPE[number]

export type SnapshotId = `extract_${string}`

export type TrendId = `trend_${string}`

export type CollectionsV0Item = {
  id: SubjectId
  name: string
  cover: string
  tags: string[]
  score: number
  time: string
}

export type SnapshotSubjectsItem = {
  id?: SubjectId
  image?: Cover<'c'> | ''
  name?: string
  name_cn?: string
  rank?: number
  tags?: {
    name: string
    count: string
    meta: boolean
  }[]
  character?: {
    id: number
    name: string
    nameJP: string
    image: CoverCrt<'g'> | ''
    desc: string
    actorId: number
  }[]
  staff?: {
    id: number
    name: string
    nameJP: string
    image: CoverCrt<'g'> | ''
    desc: string
    actorId?: number
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
