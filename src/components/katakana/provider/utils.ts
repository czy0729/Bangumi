/*
 * @Author: czy0729
 * @Date: 2024-05-03 07:58:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 07:37:20
 */
import type { TextLayoutLine } from 'react-native'
import { NUMBER_OF_LINES_OVERFLOW_RATIO, ROMAJI_WIDTH_RATIO } from '../ds'
import type { Matches } from './types'

/**
 * 根据行坐标与字体度量推算每个片假名出现的位置
 *  - 垂直: 字体度量已占满整个行盒 (asc + desc = height), 罗马音槽位即 cap 顶上方
 *    (asc - cap) 的空间, 故罗马音底边锚定在该槽位处:
 *    top = capTop - ((asc - desc) + (asc - cap)) * size / baseSize
 *  - 行高收敛为 0 时 (仅首行有罗马音), 基底文字随 reported ascender 上移,
 *    需按行高差比例补偿罗马音上移, 满行高态自动为 0
 *  - 水平: 按行内字符占比换算片假名盒, 罗马音宽度按字符数估算;
 *    单匹配居中 (超出所在行边界则贴边), 多匹配重叠时在片假名跨距内均匀分布
 *  - 度量缺失时 (如 web) 回退为 line.y - size
 */
export function getMeasuredMatches(
  matches: Matches[],
  lines: TextLayoutLine[],
  size: number,
  baseSize: number,
  fullLineHeight: number = 0
): Matches[] {
  if (!matches.length || !lines.length) return []

  const measured = matches
    .map(match => {
      let lineIndex = lines.findIndex(line => line.text.includes(match.jp))
      let prefixLength = match.jp.length
      if (lineIndex === -1) {
        // 单词被换行截断: 找以最长前缀结尾的行 (单词起始行)
        for (let p = match.jp.length - 1; p > 0; p -= 1) {
          const prefix = match.jp.slice(0, p)
          lineIndex = lines.findIndex(line => line.text.endsWith(prefix))
          if (lineIndex !== -1) {
            prefixLength = p
            break
          }
        }
        if (lineIndex === -1) return null
      }

      const line = lines[lineIndex]
      const jpOnLine = match.jp.slice(0, prefixLength)
      const offset = line.text.indexOf(jpOnLine)
      const length = line.text.length
      const hasMetrics =
        typeof line.ascender === 'number' &&
        typeof line.capHeight === 'number' &&
        typeof line.descender === 'number'
      const top = hasMetrics
        ? line.y +
          line.ascender -
          line.capHeight -
          ((2 * line.ascender - line.descender - line.capHeight) * size) / baseSize -
          getLineHeightCompensation(line, fullLineHeight)
        : line.y - size
      return {
        ...match,
        lineIndex,
        top,
        boxLeft: line.x + (length ? (offset / length) * line.width : 0),
        boxWidth: (length ? prefixLength / length : 1) * line.width,
        lineX: line.x,
        lineWidth: line.width
      } as Matches & { boxLeft: number; boxWidth: number; lineX: number }
    })
    .filter(
      (item): item is Matches & { boxLeft: number; boxWidth: number; lineX: number } => !!item
    )

  type MeasuredItem = Matches & { boxLeft: number; boxWidth: number; lineX: number }
  const groups = new Map<number, MeasuredItem[]>()
  measured.forEach(item => {
    const group = groups.get(item.lineIndex)
    if (group) group.push(item)
    else groups.set(item.lineIndex, [item])
  })

  const result: Matches[] = []
  groups.forEach(group => {
    group.sort((a, b) => a.boxLeft - b.boxLeft)
    const lefts = layoutLineItems(group, size)
    group.forEach((item, index) => {
      const { boxLeft: _, boxWidth, lineX: __, ...rest } = item
      result.push({ ...rest, left: lefts[index], width: boxWidth } as Matches)
    })
  })
  return result
}

/** 估算罗马音宽度 */
function getRomajiWidth(en: string, size: number) {
  return en.length * size * ROMAJI_WIDTH_RATIO
}

/**
 * 行高收敛补偿
 *  - 满行高态: fullLineHeight === line.height, 补偿为 0
 *  - 收敛态 (仅首行有罗马音): 行盒变矮, RN 按 reported ascender 抬高基底文字,
 *    顶部被削去的行高 (fullLineHeight - line.height) 按 asc/height 比例分摊上移量,
 *    罗马音需同样上移才能贴合
 */
function getLineHeightCompensation(line: TextLayoutLine, fullLineHeight: number) {
  const reduce = Math.max(0, fullLineHeight - line.height)
  if (!reduce || !line.height) return 0
  return (line.ascender / line.height) * reduce
}

/**
 * 行内罗马音水平布局
 *  - 单匹配: 居中, 超出所在行边界则贴边
 *  - 多匹配: 各自居中无重叠则保持; 有重叠则在片假名跨距内均匀分布 (space-between)
 */
function layoutLineItems(
  items: (Matches & { boxLeft: number; boxWidth: number; lineX: number })[],
  size: number
): number[] {
  const frameLeft = items[0].lineX
  const frameRight = items[0].lineX + items[0].lineWidth
  const romajiWidth = (item: (typeof items)[number]) => getRomajiWidth(item.en, size)
  const center = (item: (typeof items)[number]) =>
    item.boxLeft + (item.boxWidth - romajiWidth(item)) / 2
  const clamp = (left: number, width: number) =>
    Math.max(frameLeft, Math.min(left, frameRight - width))

  if (items.length === 1) return [clamp(center(items[0]), romajiWidth(items[0]))]

  const centered = items.map(center)
  const overlapped = centered.some(
    (left, index) =>
      index < items.length - 1 && left + romajiWidth(items[index]) > centered[index + 1]
  )
  if (!overlapped) return items.map((item, index) => clamp(centered[index], romajiWidth(item)))

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
  return lefts.map((left, index) => clamp(left, romajiWidth(items[index])))
}

/** 判断某片段罗马音是否应渲染 (numberOfLines 截断时, 超出可见范围的应过滤) */
export function shouldRenderKatakana(item: Matches, size: number, numberOfLines?: number) {
  if (numberOfLines === 1) return item.lineIndex === 0
  if (!numberOfLines || item.lineIndex === 0) return true
  return (item.top || 0) <= numberOfLines * size * NUMBER_OF_LINES_OVERFLOW_RATIO
}

/** 判断是否需要撑高整段文字: 仅首行有罗马音时不需要 */
export function shouldIncreaseLineHeight(measured: Matches[]) {
  return measured.some(item => (item.lineIndex || 0) > 0)
}
