/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 19:19:46
 */
import type { GetRouteParams, Loaded, RouteSubjectLink, SubjectId, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSubjectLink>

export type NodeItem = {
  date: string
  id: SubjectId
  name: string
  nameCN: string
  nsfw: boolean
  platform: string

  /** 条目类型 (bangumi-link 数据源为数字, MODEL 的 getTitle 宽松比较兼容) */
  type: number
}

export type RelateMap = {
  id: SubjectId
  node: NodeItem[]
  relate: {
    dst: SubjectId
    relate: string
    src: SubjectId
  }[]
  _loaded?: Loaded
}

export type TrendId = `trend_${string}`
