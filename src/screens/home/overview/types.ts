/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:31:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-02 23:42:41
 */
import type { GetRouteParams, RouteOverview, SubjectId, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteOverview>

export type ListItem = {
  id: SubjectId
  image: string
  name: string
  desc?: string
}
