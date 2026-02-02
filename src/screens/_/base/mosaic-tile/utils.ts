/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:55:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 14:57:07
 */

/** 格式化日期 */
export function formatYMD(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * 生成 MosaicTile 的格子日期数组
 * - 当前月完整显示（1号~当月最后一天）
 * - 历史格子向前推一年
 * - 返回顺序从最近到最早
 */
export function getDatesForMosaic() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  // 当前月最后一天
  const currentMonthLast = new Date(currentYear, currentMonth, 0) // 0 = 上月最后一天

  // 历史起点：向前推 52 周
  const historyStart = new Date(currentYear, currentMonth - 1, 1)
  historyStart.setDate(historyStart.getDate() - 52 * 7)

  const days: string[] = []
  const d = new Date(historyStart)

  // 循环到当前月最后一天
  while (d <= currentMonthLast) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    days.push(`${y}-${m}-${day}`)
    d.setDate(d.getDate() + 1)
  }

  return days.reverse()
}
