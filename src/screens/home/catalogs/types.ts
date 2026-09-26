/*
 * @Author: czy0729
 * @Date: 2022-07-19 15:51:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 19:09:17
 *
 * 条目目录页面类型
 */
import type { SubjectCatalogs } from '@stores/subject/types'
import type { ResultData } from '@utils/kv/type'
import type { GetRouteParams, RouteSubjectCatalogs, SubjectId, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSubjectCatalogs>

export type SnapshotId = `subject-catalogs_${SubjectId}`

/** 云快照 */
export type Snapshot = ResultData<Partial<SubjectCatalogs>> & {
  /** 快照读取时间 */
  _loaded: number
}
