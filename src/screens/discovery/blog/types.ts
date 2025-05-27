/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:47:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:29:02
 */
import { GetRouteParams, RouteDiscoveryBlog, SubjectType, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteDiscoveryBlog>

export type BlogType = SubjectType | 'all'
