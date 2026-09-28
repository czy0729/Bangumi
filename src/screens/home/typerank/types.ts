/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:49:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 19:06:21
 */
import type { GetRouteParams, RouteTyperank, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTyperank>

/** OSS 条目快照 */
export type OssSubject = {
  /** 原名 */
  name?: string

  /** 中文名 */
  name_cn?: string

  /** 类型 */
  type?: string

  /** 封面 */
  image?: string

  /** 排名 */
  rank?: number

  /** 评分 */
  rating?: {
    score?: number
    total?: number
  }

  /** 话数 */
  totalEps?: number

  /** 日期 */
  date?: string

  /** 原作 */
  origin?: string

  /** 导演 */
  director?: string

  /** 原始信息 (仅处理中存在, 会删除) */
  info?: string

  /** 标签 (仅处理中存在, 会删除) */
  tags?: {
    name: string
  }[]

  /** 制作人员 (仅处理中存在, 会删除) */
  staff?: {
    name?: string
    nameJP?: string
    desc?: string
  }[]

  /** 加载时间戳 */
  _loaded?: number
}
