/*
 * @Author: czy0729
 * @Date: 2024-05-03 07:58:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 09:00:00
 */
import { layoutLineItems } from './layout'
import { computeRomajiTop } from './anchor'
import { charWidthSum, getCharWidth } from './measure'

import type { TextLayoutLine } from 'react-native'
import type { Matches } from './types'
import type { MeasuredItem } from './layout'

/** 匹配解析结果: 词在某行的位置 */
type Res = {
  match: Matches
  lineIndex: number
  offset: number
  prefixLength: number
}

/** 像素跨度 */
type Span = { lineIndex: number; left: number; right: number }

/** 所在行是否为 numberOfLines 截断的最后可见行 (该行之后的行均不可见) */
function isLastLine(lineIndex: number, numberOfLines?: number): boolean {
  return numberOfLines !== undefined && lineIndex + 1 >= numberOfLines
}

/** 词完整在行内时, 词尾超出可见范围视为被省略号截断 */
function wholeWordTruncated(res: Res, lines: TextLayoutLine[], numberOfLines?: number): boolean {
  return (
    isLastLine(res.lineIndex, numberOfLines) &&
    res.offset + res.prefixLength >= lines[res.lineIndex].text.length
  )
}

/** 计算词在可见文本内是否不完整 */
function resolveTruncated(res: Res, lines: TextLayoutLine[], numberOfLines?: number): boolean {
  if (res.prefixLength === res.match.jp.length) return wholeWordTruncated(res, lines, numberOfLines)
  const suffix = res.match.jp.slice(res.prefixLength)
  const nextLine = lines[res.lineIndex + 1]
  const nextVisible = !!(
    nextLine && res.lineIndex + 1 < (numberOfLines ?? Number.POSITIVE_INFINITY)
  )
  return !!suffix && !(nextVisible && nextLine?.text.startsWith(suffix))
}

/** 位置对应的像素跨度 (按视觉宽度等比) */
function pixelSpan(res: Res, lines: TextLayoutLine[]): Span {
  const l = lines[res.lineIndex]
  const total = charWidthSum(l.text, 0, l.text.length)
  return {
    lineIndex: res.lineIndex,
    left: l.x + (total ? (charWidthSum(l.text, 0, res.offset) / total) * l.width : 0),
    right:
      l.x + (total ? (charWidthSum(l.text, 0, res.offset + res.prefixLength) / total) * l.width : 0)
  }
}

/** 初次解析: 命中完整词所在行, 或跨行/截断时取最长前缀所在行 */
function resolveInitialPositions(matches: Matches[], lines: TextLayoutLine[]): Res[] {
  return matches
    .map(match => {
      let lineIndex = lines.findIndex(line => line.text.includes(match.jp))
      let prefixLength = match.jp.length
      if (lineIndex === -1) {
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
      const offset = lines[lineIndex].text.indexOf(match.jp.slice(0, prefixLength))
      if (offset === -1) return null
      return { match, lineIndex, offset, prefixLength } as Res
    })
    .filter((res): res is Res => !!res)
}

/**
 * 长词优先认领可见跨度, 避免子串命中同一位置 (如 'ムリ' 命中 'ムリムリ' 内部);
 * 被认领的匹配重新解析到下一个未被占用的出现位置
 */
function resolveNonOverlapping(initial: Res[], lines: TextLayoutLine[]): Res[] {
  const claimed: Span[] = []
  const isCovered = (span: Span) =>
    claimed.some(
      c => c.lineIndex === span.lineIndex && c.left <= span.left && span.right <= c.right
    )

  /** 认领匹配的可见跨度, 跨行词连后缀所在行开头一并认领 */
  const claim = (res: Res) => {
    claimed.push(pixelSpan(res, lines))
    const suffix = res.match.jp.slice(res.prefixLength)
    if (!suffix) return
    const nextLine = lines[res.lineIndex + 1]
    if (nextLine?.text.startsWith(suffix)) {
      const nextTotal = charWidthSum(nextLine.text, 0, nextLine.text.length)
      claimed.push({
        lineIndex: res.lineIndex + 1,
        left: nextLine.x,
        right:
          nextLine.x +
          (nextTotal
            ? (charWidthSum(nextLine.text, 0, suffix.length) / nextTotal) * nextLine.width
            : 0)
      })
    }
  }

  /** 词的全部出现位置 (行内完整 + 跨行前缀), 按阅读顺序 */
  const findAllOccurrences = (match: Matches): Res[] => {
    const all: Res[] = []
    lines.forEach((l, lineIndex) => {
      let idx = l.text.indexOf(match.jp)
      while (idx !== -1) {
        all.push({ match, lineIndex, offset: idx, prefixLength: match.jp.length })
        idx = l.text.indexOf(match.jp, idx + 1)
      }
      for (let p = match.jp.length - 1; p > 0; p -= 1) {
        const prefix = match.jp.slice(0, p)
        const suffix = match.jp.slice(p)
        if (l.text.endsWith(prefix) && lines[lineIndex + 1]?.text.startsWith(suffix)) {
          all.push({ match, lineIndex, offset: l.text.length - p, prefixLength: p })
          break
        }
      }
    })
    return all
  }

  const kept: Res[] = []
  const ordered = [...initial].sort((a, b) => b.match.jp.length - a.match.jp.length)
  ordered.forEach(res => {
    if (!isCovered(pixelSpan(res, lines))) {
      claim(res)
      kept.push(res)
      return
    }
    const next = findAllOccurrences(res.match).find(next => !isCovered(pixelSpan(next, lines)))
    if (next) {
      claim(next)
      kept.push(next)
    }
  })
  return kept
}

/** 每视觉宽度单位对应的像素: 用完整行校准, numberOfLines=1 无完整行时回退基底字号 */
function computePixelPerUnit(
  lines: TextLayoutLine[],
  numberOfLines: number | undefined,
  baseSize: number
): number {
  if (numberOfLines === undefined) return baseSize
  const fullLine = lines.findIndex((l, i) => {
    if (i + 1 >= numberOfLines) return false
    const total = charWidthSum(l.text, 0, l.text.length)
    return l.text.length > 0 && total > 0 && l.width > 0
  })
  if (fullLine === -1) return baseSize
  return lines[fullLine].width / charWidthSum(lines[fullLine].text, 0, lines[fullLine].text.length)
}

/** 行在可见宽度内可容纳的字符数 (iOS 截断行 text 为完整剩余文本, 仅部分可见) */
function visibleCharsOfLine(line: TextLayoutLine, pixelPerUnit: number): number {
  let count = 0
  let width = 0
  for (let i = 0; i < line.text.length; i += 1) {
    const next = width + getCharWidth(line.text[i])
    if (next * pixelPerUnit > line.width) break
    width = next
    count += 1
  }
  return count
}

/**
 * 测量单个匹配项
 *  - 截断行的完整剩余文本中, 词起点超出可见宽度的部分完全不可见, 返回 null
 *  - 垂直按字体度量锚定, 水平按视觉宽度等比换算片假名盒
 */
function measureItem(
  res: Res,
  lines: TextLayoutLine[],
  size: number,
  baseSize: number,
  fullLineHeight: number,
  numberOfLines: number | undefined,
  pixelPerUnit: number
): MeasuredItem | null {
  const line = lines[res.lineIndex]
  const total = charWidthSum(line.text, 0, line.text.length)
  if (
    isLastLine(res.lineIndex, numberOfLines) &&
    res.offset >= visibleCharsOfLine(line, pixelPerUnit)
  ) {
    return null
  }
  const hasMetrics =
    typeof line.ascender === 'number' &&
    typeof line.capHeight === 'number' &&
    typeof line.descender === 'number'
  const top = hasMetrics
    ? computeRomajiTop(line, size, baseSize, fullLineHeight)
    : line.y - size
  const boxLeft = line.x + (total ? (charWidthSum(line.text, 0, res.offset) / total) * line.width : 0)
  const boxWidth = total
    ? (charWidthSum(line.text, res.offset, res.offset + res.prefixLength) / total) * line.width
    : 0
  const lastLine = isLastLine(res.lineIndex, numberOfLines)
  return {
    ...res.match,
    lineIndex: res.lineIndex,
    truncated: resolveTruncated(res, lines, numberOfLines),
    lastLine,
    lineTruncated: lastLine && visibleCharsOfLine(line, pixelPerUnit) < line.text.length,
    top,
    boxLeft,
    boxWidth,
    lineX: line.x,
    lineWidth: line.width
  }
}

/**
 * 根据行坐标与字体度量推算每个片假名出现的位置
 *  - 垂直: 罗马音垂直锚定按平台拆分 (computeRomajiTop), iOS 按字体度量锚定槽位,
 *    Android 锚定稳定的行盒顶 line.y, 避免逐行度量漂移导致罗马音被遮盖
 *  - 行高收敛为 0 时 (仅首行有罗马音), 基底文字随 reported ascender 上移,
 *    需按行高差比例补偿罗马音上移, 满行高态自动为 0
 *  - 水平: 按行内视觉宽度占比换算片假名盒, 罗马音宽度按字符数估算;
 *    单匹配居中 (超出所在行边界则贴边), 多匹配重叠时在片假名跨距内均匀分布
 *  - 度量缺失时 (如 web) 回退为 line.y - size
 */
export function getMeasuredMatches(
  matches: Matches[],
  lines: TextLayoutLine[],
  size: number,
  baseSize: number,
  fullLineHeight: number = 0,
  numberOfLines?: number
): Matches[] {
  if (!matches.length || !lines.length) return []

  const initial = resolveInitialPositions(matches, lines)
  const kept = resolveNonOverlapping(initial, lines)
  const pixelPerUnit = computePixelPerUnit(lines, numberOfLines, baseSize)

  const groups = new Map<number, MeasuredItem[]>()
  kept.forEach(res => {
    const item = measureItem(
      res,
      lines,
      size,
      baseSize,
      fullLineHeight,
      numberOfLines,
      pixelPerUnit
    )
    if (!item) return
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

/**
 * 判断某片段罗马音是否应渲染
 *  - numberOfLines 截断时 onTextLayout 返回的 lines 仅含可见行,
 *    行索引在可见行数内的都应渲染, 水平位置由 layoutLineItems 居中/贴边自适应
 */
export function shouldRenderKatakana(item: Matches, _size: number, numberOfLines?: number) {
  if (!numberOfLines) return true
  return (item.lineIndex || 0) < numberOfLines
}

/** 判断是否需要撑高整段文字: 仅首行有罗马音时不需要 */
export function shouldIncreaseLineHeight(measured: Matches[]) {
  return measured.some(item => (item.lineIndex || 0) > 0)
}
