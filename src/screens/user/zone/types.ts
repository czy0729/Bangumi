/*
 * @Author: czy0729
 * @Date: 2022-10-22 01:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * 页面 Ctx 与跨组件共享类型
 */
import type { ScrollTo, ScrollToOffset } from '@components'
import type { GetRouteParams, RouteZone, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteZone>

/** 可滚动实例 (ListView 或 ScrollView) 上取用的滚动方法 */
export type ForwardRefTarget = {
  /** 滚动到偏移量 */
  scrollToOffset?: ScrollToOffset

  /** iOS ScrollView 滚动 */
  scrollTo?: ScrollTo

  /** Android ScrollView 滚动 */
  scrollResponderScrollTo?: ScrollTo
}
