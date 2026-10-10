/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:47:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 页面上下文与标签页类型
 */
import type { GetRouteParams, RouteDiscoveryBlog, SubjectType, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteDiscoveryBlog>

/** 标签页 key, all 为全部 */
export type BlogType = SubjectType | 'all'
