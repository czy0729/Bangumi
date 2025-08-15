/*
 * @Author: czy0729
 * @Date: 2022-08-19 03:30:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 03:31:37
 */
import { asc, desc, getTimestamp } from '@utils'

function getRecentTimestamp(recent) {
  try {
    let timestamp = 0
    const d = recent.match(/\d+d/g)
    if (d) {
      timestamp += parseInt(d[0]) * 24 * 60 * 60
    }

    const h = recent.match(/\d+h/g)
    if (h) {
      timestamp += parseInt(h[0]) * 60 * 60
    }

    const m = recent.match(/\d+m/g)
    if (m) {
      timestamp += parseInt(m[0]) * 60
    }

    const s = recent.match(/\d+s/g)
    if (s) {
      timestamp += parseInt(s[0])
    }

    return timestamp
  } catch (error) {
    return getTimestamp()
  }
}

export function sortByRecent(recentA, recentB) {
  if (recentA.includes('-') && recentB.includes('-'))
    return desc(getTimestamp(recentA), getTimestamp(recentB))

  if (recentA.includes('-') && !recentB.includes('-')) return 1
  if (!recentA.includes('-') && recentB.includes('-')) return -1

  return asc(getRecentTimestamp(recentA), getRecentTimestamp(recentB))
}
