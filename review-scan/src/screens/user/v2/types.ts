/*
 * @Author: czy0729
 * @Date: 2022-08-04 16:57:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 19:25:59
 */
import { GetRouteParams, RouteUser, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteUser>
