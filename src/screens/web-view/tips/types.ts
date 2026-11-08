/*
 * @Author: czy0729
 * @Date: 2023-06-23 14:19:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 12:00:00
 *
 * 页面上下文与路由参数
 */
import type { GetRouteParams, RouteTips, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTips>
