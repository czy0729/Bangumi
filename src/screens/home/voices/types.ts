/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:58:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 16:34:23
 */
import type { GetRouteParams, RouteVoices, WithNavigation } from '@types'
import type Store from './store'
import type { DATA_STATUS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteVoices>

export type SnapshotId = `voices_${string}`

export type Status = (typeof DATA_STATUS)[number]
