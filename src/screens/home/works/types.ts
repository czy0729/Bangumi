/*
 * @Author: czy0729
 * @Date: 2022-07-31 17:54:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:59:40
 *
 * 人物的作品页面类型
 */
import type { GetRouteParams, RouteWorks, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteWorks>

/** 工具栏可切换项 */
export type ToolBarKeys = 'list' | 'fixed' | 'collected'

/** 云快照键 (同一人物在不同排序 / 职位下分别缓存) */
export type SnapshotId = `works_${string}`
