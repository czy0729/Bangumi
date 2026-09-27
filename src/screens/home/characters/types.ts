/*
 * @Author: czy0729
 * @Date: 2022-07-19 15:51:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-07 05:28:00
 *
 * 更多角色页面类型
 */
import type { ResultData } from '@utils/kv/type'
import type { Characters } from '@stores/mono/types'
import type { GetRouteParams, RouteCharacters, SubjectId, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteCharacters>

export type SnapshotId = `characters_${SubjectId}`

/** 云快照 */
export type Snapshot = ResultData<Characters> & {
  /** 快照读取时间 */
  _loaded: number
}
