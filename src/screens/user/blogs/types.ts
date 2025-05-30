/*
 * @Author: czy0729
 * @Date: 2022-08-19 04:29:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 06:47:37
 */
import { GetRouteParams, RouteBlogs, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteBlogs>
