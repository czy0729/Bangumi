/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:52:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 页面上下文与标签类型
 */
import type { GetRouteParams, RouteCharacter, WithNavigation } from '@types'
import type Store from './store'
import type { TABS_SELF } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteCharacter>

/** 标签页 key */
export type Keys = (typeof TABS_SELF)[number]['key']
