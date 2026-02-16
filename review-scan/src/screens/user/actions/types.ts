/*
 * @Author: czy0729
 * @Date: 2022-11-23 09:53:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:38:21
 */
import { GetRouteParams, Id, RouteActions, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteActions>

export type Item = {
  show?: boolean
  uuid: Id
  name: string
  url: string
  sort: Id
  active: 0 | 1
}
