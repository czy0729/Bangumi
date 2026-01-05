/*
 * @Author: czy0729
 * @Date: 2022-09-29 16:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-04 20:20:13
 */
import type { GetRouteParams, RouteBlog, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteBlog>
