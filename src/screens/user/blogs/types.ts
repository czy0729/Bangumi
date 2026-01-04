/*
 * @Author: czy0729
 * @Date: 2022-08-19 04:29:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-03 06:55:00
 */
import type { GetRouteParams, RouteBlogs, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteBlogs>
