/*
 * @Author: czy0729
 * @Date: 2022-09-29 06:10:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 10:40:43
 */
import { GetRouteParams, RouteSay, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSay>
