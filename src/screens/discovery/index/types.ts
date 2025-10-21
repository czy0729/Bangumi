/*
 * @Author: czy0729
 * @Date: 2022-09-09 20:13:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 15:43:59
 */
import type { CalendarItem } from '@stores/calendar/types'
import type { IconfontNames, Override, Paths, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type MenuItemType = {
  key: Paths | 'Open' | 'Netabare' | 'Split' | 'Link' | 'Cancel' | 'Save'
  name: string
  text?: string
  icon?: IconfontNames
  size?: number
  web?: boolean
  ios?: boolean
  login?: boolean
}

export type MenuMapType = Partial<Record<MenuItemType['key'], MenuItemType>>

export type CalendarItemWithWeekday = Override<
  CalendarItem,
  {
    weekday: number
  }
>
