/*
 * @Author: czy0729
 * @Date: 2026-08-27 02:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 03:53:40
 */

/** 判断是否今天放送 */
export function isOnairToday(weekDay: string | number, isOnair: boolean) {
  if (!isOnair) return false
  const day = new Date().getDay()
  const n = Number(weekDay)
  const wd = n === 7 ? 0 : n
  return wd === day
}

/** 判断是否明天放送 */
export function isOnairNextDay(weekDay: string | number, isOnair: boolean) {
  if (!isOnair) return false
  const day = new Date().getDay()
  const n = Number(weekDay)
  const wd = n === 7 ? 0 : n
  return day === 6 ? wd === 0 : day === wd - 1
}

/** 获取从今天到下次放送的天数（1-6，跨周处理） */
export function getDaysUntilNext(weekDay: string | number): number {
  const today = new Date().getDay() // 0-6 (Sun-Sat)
  const n = Number(weekDay)
  const wd = n === 7 ? 0 : n // store 1-7(7=Sun) → JS 0-6(0=Sun)
  if (wd > today) return wd - today
  return 7 - today + wd
}
