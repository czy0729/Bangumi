/*
 * @Author: czy0729
 * @Date: 2022-09-09 20:13:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-17 21:29:29
 */
import type { CalendarItem } from '@stores/calendar/types'
import type { Override, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type CalendarItemWithWeekday = Override<
  CalendarItem,
  {
    weekday: number
  }
>
