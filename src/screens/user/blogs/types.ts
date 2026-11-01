/*
 * @Author: czy0729
 * @Date: 2022-08-19 04:29:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 14:43:56
 *
 * 用户日志页类型
 */
import type { GetRouteParams, RouteBlogs, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  /** 页面 store */
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteBlogs>
