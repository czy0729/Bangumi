/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:22:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 用户时间线页面类型
 */
import type { GetRouteParams, RouteUserTimeline, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  /** 页面 store */
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteUserTimeline>

/** 时间线一条记录关联的单个条目 */
type TimelineSubject = {
  /** 条目 id */
  id: number

  /** 条目名 */
  name: string

  /** 封面地址 */
  cover: string

  /** 评分 */
  star: string

  /** 吐槽 */
  comment: string
}

/** 时间线中的一条活动记录 */
export type TimelineViewItem = {
  /** 记录 id */
  id: string

  /** 日期 (Y-m-d) */
  date: string

  /** 动作 (看过 / 在看 等) */
  action: string

  /** 关联条目 */
  subject: TimelineSubject[]

  /** 时间 */
  time: string
}

/** 按天分组 */
export type DaySection = {
  /** 日期 (Y-m-d) */
  title: string

  /** 当天的活动 */
  data: TimelineViewItem[]
}

/** 按月分组 */
export type MonthSection = {
  /** 月份 (Y-m) */
  title: string

  /** 当月按天分组的数据 */
  data: DaySection[]

  /** 当月各动作的条目数 */
  actions: Record<string, number>
}

/** 按年分组 */
export type YearSection = {
  /** 年份 (Y) */
  title: string

  /** 当年按月分组的数据 */
  data: MonthSection[]
}
