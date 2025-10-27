/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:03:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:34:31
 */
import { GetRouteParams, RouteCatalogs, WithNavigation } from '@types'
import Store from './store'
import { TABS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteCatalogs>

export type TabsLabel = (typeof TABS)[number]['key']
