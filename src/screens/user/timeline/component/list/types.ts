/*
 * @Author: czy0729
 * @Date: 2026-11-05 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 时间线分组组件 Props
 */
import type { DaySection, MonthSection, YearSection } from '../../types'

/** 年份分组 */
export type YearProps = {
  /** 年份数据 */
  item: YearSection

  /** 是否第一年, 第一年展示加入天数 */
  isFirst: boolean

  /** 加入班咕咪天数 */
  days: number | string
}

/** 月份分组 */
export type MonthProps = {
  /** 月份数据 */
  item: MonthSection
}

/** 天分组 */
export type DayProps = {
  /** 当天的数据 */
  item: DaySection
}

/** 动作统计 */
export type ActionsProps = {
  /** 各动作的条目数 */
  actions: Record<string, number>
}
