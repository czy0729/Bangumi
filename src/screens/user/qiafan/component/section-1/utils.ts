/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:51:28
 */
import { date } from '@utils'
import { AXIS_WIDTH, CARD_WIND, SIDE_WIDTH, TICK_MAX_COUNT, TICK_STEPS, YEAR_MIN_GAP } from './ds'

import type { Week } from '../../github'
import type { Label } from './types'

/** 纵轴刻度值, 从 0 起按步长递增 */
export function getTicks(max: number) {
  const step =
    TICK_STEPS.find(item => max / item <= TICK_MAX_COUNT) || Math.ceil(max / TICK_MAX_COUNT)

  const ticks: number[] = []
  for (let tick = 0; tick <= max; tick += step) ticks.push(tick)
  return ticks
}

/** 英文月份缩写 */
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
] as const

/** 月份标注, withYear 时带年份后两位 (Jul 26) */
function formatMonth(timestamp: number, withYear: boolean = false) {
  const month = MONTH_NAMES[Number(date('n', timestamp)) - 1]
  return withYear ? `${month} ${date('y', timestamp)}` : month
}

/** 跨月位置的月份刻度, 相邻太挤的跳过 */
export function getMonthLabels(
  weeks: Week[],
  width: number,
  minGap: number = YEAR_MIN_GAP,
  withYear: boolean = false
) {
  return getChangeLabels(weeks, width, item => formatMonth(item.w, withYear), minGap)
}

/** 抽取公共逻辑: 在值发生切换的位置生成刻度, 相邻太挤的跳过 */
function getChangeLabels(
  weeks: Week[],
  width: number,
  getLabel: (item: Week) => string,
  minGap: number
): Label[] {
  let prev = ''
  const labels: Label[] = []

  weeks.forEach((item, index) => {
    const label = getLabel(item)
    if (label === prev) return

    prev = label

    const left = (index / weeks.length) * width
    const last = labels[labels.length - 1]
    if (last && left - last.left < minGap) return

    labels.push({
      label,
      left
    })
  })

  return labels
}

/** 抽取公共逻辑: 均匀分布固定个数的刻度, 取每个等分点所在周的标注 */
function getEvenLabels(
  weeks: Week[],
  width: number,
  count: number,
  getLabel: (item: Week) => string
): Label[] {
  if (!weeks.length) return []

  const labels: Label[] = []

  for (let i = 0; i < count; i++) {
    const index = Math.floor((i / count) * weeks.length)
    labels.push({
      label: getLabel(weeks[index]),
      left: (index / weeks.length) * width
    })
  }

  return labels
}

/** 均匀分布的年份刻度 (供缩略图底部固定个数标注) */
export function getEvenYearLabels(weeks: Week[], width: number, count: number = 5) {
  return getEvenLabels(weeks, width, count, item => `${date('Y', item.w)}`)
}

/** 均匀分布的月份刻度, 用于长跨度跨年图表 */
export function getEvenMonthLabels(
  weeks: Week[],
  width: number,
  count: number = 5,
  withYear: boolean = false
) {
  return getEvenLabels(weeks, width, count, item => formatMonth(item.w, withYear))
}

/** 最大周提交数, 至少为 1 保证除零安全 */
export function getMaxCount(weeks: Week[]) {
  return Math.max(...weeks.map(item => item.c), 1)
}

/** 卡片内图表区宽度: 扣掉卡片左右内边距、纵轴刻度栏与右侧竖排说明栏 */
export function getChartWidth(cardWidth: number) {
  return cardWidth - CARD_WIND * 2 - AXIS_WIDTH - SIDE_WIDTH
}

/** 2019年3月24日 */
export function formatWeek(timestamp: number) {
  const [year, month, day] = date('Y-m-d', timestamp)
    .split('-')
    .map(item => Number(item))

  return `${year}年${month}月${day}日`
}
