/*
 * @Author: czy0729
 * @Date: 2024-05-03 07:58:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 07:37:20
 */
import type { TextLayoutLine } from 'react-native'
import { NUMBER_OF_LINES_OVERFLOW_RATIO } from '../ds'
import type { Matches } from './types'

/** 根据罗马音是否贴近行尾决定对齐方式 */
export function getKatakanaAlign(item: Matches) {
  const lineWidth = item.lineWidth || 0
  return item.align || (lineWidth && item.left! + item.width! >= lineWidth ? 'left' : 'center')
}

/**
 * 根据行坐标推算每个片假名出现的位置
 *  - 按行内字符占比换算水平位置与宽度, 保证罗马音覆盖在对应片假名上方
 */
export function getMeasuredMatches(matches: Matches[], lines: TextLayoutLine[]): Matches[] {
  if (!matches.length || !lines.length) return []

  return matches
    .map(match => {
      const lineIndex = lines.findIndex(line => line.text.includes(match.jp))
      if (lineIndex === -1) return null

      const line = lines[lineIndex]
      const offset = line.text.indexOf(match.jp)
      const length = line.text.length
      return {
        ...match,
        lineIndex,
        top: line.y,
        left: line.x + (length ? (offset / length) * line.width : 0),
        width: (length ? match.jp.length / length : 1) * line.width,
        lineWidth: line.width
      } as Matches
    })
    .filter((item): item is Matches => !!item)
}

/** 判断某片段罗马音是否应渲染 (numberOfLines 截断时, 超出可见范围的应过滤) */
export function shouldRenderKatakana(item: Matches, size: number, numberOfLines?: number) {
  if (numberOfLines === 1) return item.lineIndex === 0
  if (!numberOfLines || item.lineIndex === 0) return true
  return (item.top || 0) <= numberOfLines * size * NUMBER_OF_LINES_OVERFLOW_RATIO
}
