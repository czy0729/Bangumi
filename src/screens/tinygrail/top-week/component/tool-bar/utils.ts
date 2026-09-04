/*
 * @Author: czy0729
 * @Date: 2025-08-03 02:51:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 19:16:27
 */
import dayjs from '@utils/thirdParty/dayjs'

export function getWeekData(prev: number = 1) {
  if (prev === 0) return '本周'

  const targetDate = dayjs().subtract(prev, 'week')
  const year = targetDate.year()
  const week = targetDate.isoWeek() + 1
  return `${year}年第${week}周`
}
