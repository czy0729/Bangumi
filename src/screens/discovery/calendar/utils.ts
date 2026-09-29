/*
 * @Author: czy0729
 * @Date: 2023-03-13 15:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
 */
import { ON_AIR } from '@stores/calendar/onair'
import { date, getTimestamp } from '@utils'
import { PREV_DAY_HOUR } from './ds'

import type { CalendarItem } from '@stores/calendar/types'
import type { SubjectId } from '@types'

/** 是否需要显示前一日的放送（早上 9 点前） */
export function getShowPrevDay() {
  return new Date().getHours() < PREV_DAY_HOUR
}

/** 当前时刻的 HHmm 数值（如 2130） */
export function getCurrentHi() {
  return parseInt(date('Hi', getTimestamp()))
}

/** 放送时间 2359 → '23:59', 未知时间返回空串 */
export function formatTime(time?: string) {
  if (!time || time === '2359') return ''
  return `${time.slice(0, 2)}:${time.slice(2)}`
}

/** 条目放送时间（本地时间优先, 未知为 2359） */
export function getTime(
  item?: Pick<CalendarItem, 'timeLocal' | 'timeCN' | 'timeJP'>,
  subjectId?: SubjectId
) {
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
