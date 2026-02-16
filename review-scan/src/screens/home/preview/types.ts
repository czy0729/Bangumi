/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:27:15
 */
import { GetRouteParams, RoutePreview, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RoutePreview>
