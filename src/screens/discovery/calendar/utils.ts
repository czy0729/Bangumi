/*
 * @Author: czy0729
 * @Date: 2023-03-13 15:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 06:54:02
 */
import { ON_AIR } from '@stores/calendar/onair'

import type { CalendarItem } from '@stores/calendar/types'
import type { SubjectId } from '@types'

export function getTime(item: any, subjectId?: SubjectId) {
  return String(
    item?.timeLocal || item?.timeCN || item?.timeJP || ON_AIR[subjectId]?.timeCN || '2359'
  )
}

/** 如果存在多个同一时间放送的条目, 只在第一个条目显示时间 */
export function getItemTime(item: CalendarItem, index: number, items: CalendarItem[]) {
  let time = getTime(item, item.id)
  if (index > 0 && time === '2359' && getTime(items[index - 1], item.id) === time) time = ''
  return time
}
