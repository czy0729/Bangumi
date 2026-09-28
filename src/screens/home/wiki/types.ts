/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:58:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * Ctx / Params 类型
 */
import type Store from './store'

import type { GetRouteParams, RouteSubjectWiki, WithNavigation } from '@types'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSubjectWiki>
