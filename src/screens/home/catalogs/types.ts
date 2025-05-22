/*
 * @Author: czy0729
 * @Date: 2022-07-19 15:51:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 06:32:19
 */
import { GetRouteParams, RouteSubjectCatalogs, SubjectId, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSubjectCatalogs>

export type SnapshotId = `subject-catalogs_${SubjectId}`
