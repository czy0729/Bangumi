/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:10:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 04:15:00
 *
 * 角色/人物列表条目 Props 与共享类型
 */
import type { PropsWithChildren } from 'react'
import type { EventType, Id, ImageSource } from '@types'

/** 声优条目 */
export type Actors = {
  /** 条目 Id */
  id: string

  /** 头像地址 */
  cover: string

  /** 日文名 */
  name: string

  /** 中文名 */
  nameCn: string

  /** 职位 */
  job?: string
}[]

export type Props = PropsWithChildren<{
  /** 事件追踪 */
  event?: EventType

  /** 列表索引, 用于计算 InView 预加载偏移 */
  index?: number

  /** 条目类型 */
  type?: 'character' | 'person'

  /** 条目 Id */
  id?: Id

  /** 封面图 */
  cover?: ImageSource | string

  /** 日文名 */
  name?: string

  /** 中文名 */
  nameCn?: string

  /** 回复数 */
  replies?: string

  /** 附加信息 */
  info?: string

  /** 声优列表 */
  actors?: Actors

  /** 职位列表 */
  positions?: string[]

  /** 职位详情 */
  positionDetails?: string[]

  /** @deprecated 单个职位, 优先用 positions */
  position?: string
}>
