/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 05:06:27
 */
import { GetRouteParams, RouteMilestone, WithNavigation } from '@types'
import Store from './store'
import { SUB_TITLE } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteMilestone>

export type SubTitle = (typeof SUB_TITLE)[number]
