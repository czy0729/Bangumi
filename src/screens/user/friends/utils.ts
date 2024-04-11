/*
 * @Author: czy0729
 * @Date: 2022-08-07 03:53:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-10 15:15:13
 */
import { asc, desc, getRecentTimestamp, getTimestamp } from '@utils'

export function sortByRecent(a: string, b: string) {
  if (a.includes('-') && !b.includes('-')) return 1
  if (!a.includes('-') && b.includes('-')) return -1
  if (a.includes('-') && b.includes('-')) return desc(getTimestamp(a) || 0, getTimestamp(b) || 0)
  return asc(getRecentTimestamp(a) || 0, getRecentTimestamp(b) || 0)
}
