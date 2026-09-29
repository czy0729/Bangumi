/*
 * @Author: czy0729
 * @Date: 2022-07-26 00:57:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
 */
import type { ListViewInstance } from '@components'
import type { Calendar, CalendarItem } from '@stores/calendar/types'
import type { Override, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type SectionListCalendarItem = Override<
  CalendarItem,
  {
    index: number
  }
>

/** 分区数据条目（ListView renderItem 的 item 参数） */
export type SectionData = Override<
  Calendar['list'][number],
  {
    items: SectionListCalendarItem[]
  }
>

/** 收集长列表的 ref */
export type HandleForwardRef = (ref: ListViewInstance) => void
