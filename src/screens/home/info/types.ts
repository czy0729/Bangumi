/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:57:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-07 11:57:38
 *
 * 条目详情页面类型
 */
import type { GetRouteParams, RouteSubjectInfo, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSubjectInfo>
