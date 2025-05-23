/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:23:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-20 14:43:26
 */
import { GetRouteParams, RouteChannel, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteChannel>
