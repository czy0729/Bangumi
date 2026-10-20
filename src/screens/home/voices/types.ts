/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:58:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 16:34:23
 *
 * 人物的角色页面类型
 */
import type { GetRouteParams, RouteVoices, WithNavigation } from '@types'
import type Store from './store'
import type { DATA_STATUS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteVoices>

/** 云快照键 (同一人物在不同职位筛选下分别缓存) */
export type SnapshotId = `voices_${string}`

/** 收藏状态 (取自 DATA_STATUS) */
export type Status = (typeof DATA_STATUS)[number]
