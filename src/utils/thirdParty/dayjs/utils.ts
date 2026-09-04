/*
 * @Author: czy0729
 * @Date: 2026-09-04 19:22:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-04 19:22:04
 */
function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

/** ISO-8601 周序号 (周一为一周起点, 含首个周四的年份为归属年) */
function getISOWeek(y: number, m: number, d: number): number {
  const target = new Date(Date.UTC(y, m, d))
  const dayNum = (target.getUTCDay() + 6) % 7
  target.setUTCDate(target.getUTCDate() - dayNum + 3)

  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4))
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3)

  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 24 * 3600 * 1000))
}

export { pad, getISOWeek }
