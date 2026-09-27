/*
 * @Author: czy0729
 * @Date: 2022-07-19 15:51:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 16:31:18
 */
import type { Persons } from '@stores/mono/types'
import type { ResultData } from '@utils/kv/type'
import type { GetRouteParams, RoutePersons, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RoutePersons>

export type SnapshotId = `persons_${string}`

/** 云快照 */
export type Snapshot = ResultData<Persons> & {
  /** 快照读取时间 */
  _loaded: number
}
