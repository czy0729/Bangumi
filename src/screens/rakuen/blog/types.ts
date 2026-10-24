/*
 * @Author: czy0729
 * @Date: 2022-09-29 16:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 页面上下文 / 路由参数 / 云快照 key
 */
import type { BlogSnapshotId } from '../types'
import type { GetRouteParams, RouteBlog, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteBlog>

/** 云快照 key */
export type SnapshotId = BlogSnapshotId
