/*
 * @Author: czy0729
 * @Date: 2024-11-29 09:35:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 09:35:48
 */
import { CalendarItem } from '@stores/calendar/types'
import { getTime } from '../../utils'

/** 如果存在多个同一时间放送的条目, 只在第一个条目显示时间 */
export function getItemTime(item: CalendarItem, index: number, items: CalendarItem[]) {
  let time = getTime(item, item.id)
  if (index > 0 && time === '2359' && getTime(items[index - 1], item.id) === time) time = ''
  return time
}
