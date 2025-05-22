/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:31:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 21:10:32
 */
import { GetRouteParams, RouteOverview, SubjectId, WithNavigation } from '@types'
import Store from './store'

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
