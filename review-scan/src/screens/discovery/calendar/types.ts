/*
 * @Author: czy0729
 * @Date: 2022-07-26 00:57:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 10:39:07
 */
import { CalendarItem } from '@stores/calendar/types'
import { Override, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type SectionListCalendarItem = Override<
  CalendarItem,
  {
    index: number
  }
>
