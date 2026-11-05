/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:55:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 瓷砖热力图: 格子日期、月份刻度与总数计算
 */
import type { MosaicTileType } from './types'

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

/** 实际展示的格子日期: 去掉上一年的当前月 */
export function getMosaicDays() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  return getDatesForMosaic().filter(
    day => !(Number(day.slice(0, 4)) < currentYear && Number(day.slice(5, 7)) === currentMonth)
  )
}

/**
 * 每个月首次出现的列下标, 7 天为一列
 *
 * @param days 格子日期
 */
export function getMonthColumns(days: string[]) {
  const columns: Record<number, number> = {}
  const seenMonth = new Set<number>()

  days.forEach((item, index) => {
    const month = Number(item.slice(5, 7))
    if (seenMonth.has(month)) return

    seenMonth.add(month)
    columns[month] = Math.floor(index / 7)
  })

  return columns
}

/**
 * 区间内的活动总数
 *
 * @param days 格子日期
 * @param mosaicTile 日期 -> 次数
 */
export function getMosaicTotal(days: string[], mosaicTile: MosaicTileType) {
  return days.reduce((sum, day) => sum + (mosaicTile[day] || 0), 0)
}

/** 以今天为 key 的推导缓存, 日期与月份列只与今天有关 */
const frameCache: {
  /** 格子日期 */
  days: string[]

  /** 每个月首次出现的列下标 */
  monthColumns: Record<number, number>

  /** 今天 (Y-m-d) */
  todayStr: string
} = {
  days: [],
  monthColumns: {},
  todayStr: ''
}

/** 当天对应的格子日期、月份列与今天, 同一天内引用保持稳定 */
export function getMosaicFrame() {
  const todayStr = formatYMD(new Date())
  if (frameCache.todayStr !== todayStr) {
    frameCache.days = getMosaicDays()
    frameCache.monthColumns = getMonthColumns(frameCache.days)
    frameCache.todayStr = todayStr
  }

  return frameCache
}
