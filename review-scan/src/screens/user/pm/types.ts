/*
 * @Author: czy0729
 * @Date: 2022-08-19 08:45:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 10:54:39
 */
import { GetRouteParams, RoutePM, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RoutePM>
