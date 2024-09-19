/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:31:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 21:10:32
 */
import { factory } from '@utils'
import { GetRouteParams, Navigation, RouteOverview, SubjectId } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteOverview>

export type ListItem = {
  id: SubjectId
  image: string
  name: string
  desc?: string
}
