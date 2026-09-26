/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 00:14:31
 */
import type { PropsWithChildren } from 'react'
import type { CatalogDetail, CatalogDetailFromOSS } from '@stores/discovery/types'
import type { EventType, Id, Navigation } from '@types'

export type Props = PropsWithChildren<{
  event?: EventType
  index?: number
  id?: Id
  name?: string

  /** 目录编纂者 (别人的才存在) */
  userName?: string
  title?: string
  info?: string
  anime?: number
  book?: number
  music?: number
  game?: number
  real?: number
  character?: number
  person?: number
  topic?: number
  blog?: number
  ep?: number

  /** 最后更新时间 */
  time?: string
  last?: string

  /** 标题高亮值 */
  filter?: string

  /** 是否自己创建的目录 */
  isUser?: boolean
  hideScore?: boolean

  /** 目录详情信息 */
  detail?: CatalogDetail
}>

export type Context = {
  navigation?: Navigation
}

/** 条目数据源 (本地详情或云快照) */
export type CatalogData = CatalogDetail | CatalogDetailFromOSS

/** 类型计数统计结果 */
export type CatalogCount = {
  /** 条目总数 */
  total: number

  /** 占比最高的条目类型 */
  typeCn: string | undefined
}

/** 坏目录判定参数 */
export type IsBadCatalogOptions = {
  /** 是否用户目录模式 */
  isUser: boolean

  /** 编纂者用户 Id */
  userId: Id | undefined

  /** 自己的用户标识 (数字 Id 与改过的用户名 ID) */
  selfIds: string[]

  /** 详情条目数 */
  listLength: number

  /** 云快照条目总数 */
  ossTotal: number | undefined

  /** 详情是否已加载 */
  detailLoaded: boolean

  /** 云快照是否已加载 */
  ossLoaded: boolean
}
