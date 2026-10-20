/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 19:19:46
 *
 * 关联图页面类型
 */
import type { GetRouteParams, Loaded, RouteSubjectLink, SubjectId, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSubjectLink>

/** 关系图节点 */
export type NodeItem = {
  /** 首播日期 */
  date: string

  /** 条目 Id */
  id: SubjectId

  /** 原名 */
  name: string

  /** 中文名 */
  nameCN: string

  /** 是否为敏感内容 */
  nsfw: boolean

  /** 平台 */
  platform: string

  /** 条目类型 (bangumi-link 数据源为数字, MODEL 的 getTitle 宽松比较兼容) */
  type: number
}

/** 关联图数据 */
export type RelateMap = {
  /** 关系图节点 ID */
  id: SubjectId

  /** 节点 */
  node: NodeItem[]

  /** 关联线 */
  relate: {
    /** 目标节点 Id */
    dst: SubjectId

    /** 关系描述 */
    relate: string

    /** 起始节点 Id */
    src: SubjectId
  }[]

  /** 数据加载时间 */
  _loaded?: Loaded
}

export type TrendId = `trend_${string}`
