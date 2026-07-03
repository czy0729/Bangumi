/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-04 07:32:20
 */
import type { UserCollectionsItem } from '@stores/collection'
import type { GetRouteParams, RouteMilestone, WithNavigation } from '@types'
import type Store from './store'
import type { SUB_TITLE } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteMilestone>

export type SubTitle = (typeof SUB_TITLE)[number]

/**
 * Milestone Item 预计算数据
 * 只包含不依赖 state 的数据转换结果
 */
export type MilestoneItemData = UserCollectionsItem & {
  /** HTMLDecode 后的标题 */
  titleDecoded: string

  /** 标题视觉长度 */
  titleVisualLength: number

  /** 原始时间字符串（YYMMDD 格式） */
  timeStr: string

  /** lastDate 解析后的时间 */
  parsedTime: string

  /** lastDate(ts, false) 解析后的时间 */
  parsedTimeNoYear: string

  /** 解析后的描述 */
  tipParsed: string
}
