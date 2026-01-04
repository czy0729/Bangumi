/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:47:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-02 20:56:54
 */
import type { GetRouteParams, RouteDiscoveryBlog, SubjectType, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteDiscoveryBlog>

export type BlogType = SubjectType | 'all'
