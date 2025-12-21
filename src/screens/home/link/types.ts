/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 21:57:08
 */
import type {
  GetRouteParams,
  Loaded,
  RouteSubjectLink,
  SubjectId,
  SubjectTypeValue,
  WithNavigation
} from '@types'
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
  type: SubjectTypeValue
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
