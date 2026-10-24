/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:06:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 页面上下文与路由参数
 */
import type { GetRouteParams, RouteBoard, WithNavigation } from '@types'
import type { BoardSnapshotId } from '../types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteBoard>

/** 云快照 key */
export type SnapshotId = BoardSnapshotId
