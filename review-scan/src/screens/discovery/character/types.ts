/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:52:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 16:55:38
 */
import { GetRouteParams, RouteCharacter, WithNavigation } from '@types'
import Store from './store'
import { TABS_SELF } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteCharacter>

export type Keys = (typeof TABS_SELF)[number]['key']
