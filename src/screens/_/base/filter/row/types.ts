/*
 * @Author: czy0729
 * @Date: 2026-11-12 22:21:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 22:21:17
 *
 * 筛选组组件类型
 */
import type { EventKeys } from '@types'
import type { Counts, FilterItem } from '../types'

/** 候选项值 */
export type OptionValue = string | number

export type Props = {
  /** 筛选项配置 */
  item: FilterItem

  /** 当前查询下的条件计数 (null = 回落静态分布) */
  counts: Counts | null

  /** 埋点事件标识 */
  eventId: EventKeys
}
