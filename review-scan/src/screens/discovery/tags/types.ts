/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:27:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:41:06
 */
import { GetRouteParams, RouteTags, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTags>
