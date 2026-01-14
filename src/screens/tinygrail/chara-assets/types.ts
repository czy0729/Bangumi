/*
 * @Author: czy0729
 * @Date: 2022-11-08 15:19:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-29 06:13:51
 */
import type { GetRouteParams, RouteTinygrailCharaAssets, WithNavigation } from '@types'
import type Store from './store'
import type { DATA, TABS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTinygrailCharaAssets>

export type Direction = '' | 'down' | 'up'

export type TabsKey = (typeof TABS)[number]['key']

export type BatchAction = (typeof DATA)[number] | ''
