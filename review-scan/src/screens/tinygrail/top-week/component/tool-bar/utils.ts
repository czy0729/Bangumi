/*
 * @Author: czy0729
 * @Date: 2025-08-03 02:51:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-03 03:04:54
 */
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

export function getWeekData(prev: number = 1) {
  if (prev === 0) return '本周'

  const targetDate = dayjs().subtract(prev, 'week')
  const year = targetDate.year()
  const week = targetDate.isoWeek() + 1
  return `${year}年第${week}周`
}
