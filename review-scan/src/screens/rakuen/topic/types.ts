/*
 * @Author: czy0729
 * @Date: 2022-07-18 17:25:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 08:13:56
 */
import { GetRouteParams, RouteTopic, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTopic>

export type FilterType = '' | 'follow' | 'likes' | 'me' | 'friends'
