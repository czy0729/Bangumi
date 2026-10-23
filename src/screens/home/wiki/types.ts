/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:58:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-22 12:00:00
 *
 * 修订历史页面类型
 */
import type { GetRouteParams, RouteSubjectWiki, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSubjectWiki>
