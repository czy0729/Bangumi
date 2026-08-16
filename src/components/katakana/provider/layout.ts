/*
 * @Author: czy0729
 * @Date: 2026-08-16 09:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 09:00:00
 */
import { getRomajiWidth } from './measure'

import type { TextLayoutLine } from 'react-native'
import type { Matches } from './types'

/** 已测量项: 携带水平盒与所在行信息 */
export type MeasuredItem = Matches & {
  boxLeft: number
  boxWidth: number
  lineX: number
  /** 该行是否为 numberOfLines 截断行 (行内存在不可见内容) */
  lineTruncated: boolean
}

/**
 * 行高收敛补偿
 *  - 满行高态: fullLineHeight === line.height, 补偿为 0
 *  - 收敛态 (仅首行有罗马音): 行盒变矮, RN 按 reported ascender 抬高基底文字,
 *    顶部被削去的行高 (fullLineHeight - line.height) 按 asc/height 比例分摊上移量,
 *    罗马音需同样上移才能贴合
 */
export function getLineHeightCompensation(line: TextLayoutLine, fullLineHeight: number): number {
  const reduce = Math.max(0, fullLineHeight - line.height)
  if (!reduce || !line.height) return 0
  return (line.ascender / line.height) * reduce
}

/**
 * 行内罗马音水平布局
 *  - 完整词: 居中, 超出所在行边界则贴边
 *  - 被截断的词: 靠右对齐到可见前缀末尾
 *  - 最后可见行中词尾超出可见宽度的词: 靠右对齐到行尾 (iOS 截断行 text 为完整剩余文本,
 *    词尾之后的内容实际已被省略号覆盖, 视觉上词在行尾)
 *  - 多匹配: 各自居中无重叠则保持; 有重叠则在片假名跨距内均匀分布 (space-between)
 */
export function layoutLineItems(items: MeasuredItem[], size: number): number[] {
  const frameLeft = items[0].lineX
  const frameRight = items[0].lineX + items[0].lineWidth
  const romajiWidth = (item: MeasuredItem) => getRomajiWidth(item.en, size)
  const clamp = (left: number, width: number) =>
    Math.max(frameLeft, Math.min(left, frameRight - width))
  const place = (item: MeasuredItem, index: number, arr: MeasuredItem[]) => {
    if (item.lineTruncated && index === arr.length - 1) {
      return clamp(frameRight - romajiWidth(item), romajiWidth(item))
    }
    if (item.truncated) {
      return clamp(item.boxLeft + item.boxWidth - romajiWidth(item), romajiWidth(item))
    }
    return clamp(item.boxLeft + (item.boxWidth - romajiWidth(item)) / 2, romajiWidth(item))
  }

  if (items.length === 1) return [place(items[0], 0, items)]

  const placed = items.map((item, index) => place(item, index, items))
  const overlapped = placed.some(
    (left, index) =>
      index < items.length - 1 && left + romajiWidth(items[index]) > placed[index + 1]
  )
  if (!overlapped) return placed

  const spanLeft = items[0].boxLeft
  const spanRight = items[items.length - 1].boxLeft + items[items.length - 1].boxWidth
  const total = items.reduce((sum, item) => sum + romajiWidth(item), 0)
  const lefts: number[] = []
  if (items.length === 2) {
    lefts.push(spanLeft, spanRight - romajiWidth(items[1]))
  } else {
    const gap = (spanRight - spanLeft - total) / (items.length - 1)
    let cursor = spanLeft
    items.forEach(item => {
      lefts.push(cursor)
      cursor += romajiWidth(item) + gap
    })
  }
  if (items[items.length - 1].lineTruncated) {
    lefts[items.length - 1] = frameRight - romajiWidth(items[items.length - 1])
  }
  return lefts.map((left, index) => clamp(left, romajiWidth(items[index])))
}
