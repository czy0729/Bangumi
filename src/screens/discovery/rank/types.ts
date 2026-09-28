/*
 * @Author: czy0729
 * @Date: 2022-07-21 19:50:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 06:29:19
 */
import type { Rank } from '@stores/tag/types'
import type { GetRouteParams, Override, RouteRank, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteRank>

export type ToolBarKeys = 'list' | 'fixed' | 'fixedPagination' | 'collected'

/** 可用统一处理的选择器筛选字段 */
export type FilterKey = 'source' | 'tag' | 'area' | 'target' | 'classification' | 'theme'

/** 选择器筛选的埋点事件 */
export type FilterEvent =
  | '排行榜.来源选择'
  | '排行榜.公共标签选择'
  | '排行榜.地区选择'
  | '排行榜.受众选择'
  | '排行榜.分级选择'
  | '排行榜.题材选择'

export type ComputedRank = Override<
  Rank,
  {
    /** x18 过滤数量 */
    _filter?: string | number
  }
>

export type SnapshotId = `rank_v2_${string}`

/** 排行榜类型 (SUBJECT_TYPE label) */
export type RankType = 'anime' | 'book' | 'game' | 'music' | 'real'

/** 云快照数据 (完整 Rank 结构 + 上传时间戳) */
export type OtaSnapshot = Override<
  Rank,
  {
    /** 快照上传时间戳 */
    ts?: number
  }
>
