/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:52:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:05:06
 */
import type { GetRouteParams, RouteCharacter, WithNavigation } from '@types'
import type Store from './store'
import type { TABS_SELF } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteCharacter>

export type Keys = (typeof TABS_SELF)[number]['key']
