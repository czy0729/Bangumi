/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 19:45:50
 */
import type { GetRouteParams, RouteMilestone, WithNavigation } from '@types'
import type Store from './store'
import type { SUB_TITLE } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteMilestone>

export type SubTitle = (typeof SUB_TITLE)[number]
