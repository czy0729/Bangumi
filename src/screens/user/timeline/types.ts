/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:22:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 07:31:03
 */
import type { GetRouteParams, RouteUserTimeline, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteUserTimeline>

type TimelineSubject = {
  id: number
  name: string
  cover: string
  star: string
  comment: string
}

export type TimelineViewItem = {
  id: string
  date: string
  action: string
  subject: TimelineSubject[]
  time: string
}

export type DaySection = {
  title: string
  data: TimelineViewItem[]
}

export type MonthSection = {
  title: string
  data: DaySection[]
  actions: Record<string, number>
}

export type YearSection = {
  title: string
  data: MonthSection[]
}
