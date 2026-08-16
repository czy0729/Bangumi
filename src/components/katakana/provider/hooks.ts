/*
 * @Author: czy0729
 * @Date: 2026-08-15 05:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 07:37:05
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LINE_HEIGHT_INCREASE } from '../ds'
import { getMeasuredMatches, shouldIncreaseLineHeight } from './utils'

import type { TextLayoutEvent, TextLayoutLine } from 'react-native'
import type { Matches } from './types'

/**
 * 片假名测量控制器, 由 Provider 消费
 *  - 收集匹配到的片假名, 并通过真实渲染 Text 的 onTextLayout 测量每行坐标
 *  - 按行内比例推算每个片假名出现的位置
 *  - 仅首行有罗马音时无需撑高整段文字 (lineHeightIncrease 收敛为 0)
 * @param fullLineHeight 满行高态 (带 LINE_HEIGHT_INCREASE) 的行高, 用于行高收敛后的上移补偿
 */
export function useKatakanaController(
  size: number,
  baseSize: number,
  fullLineHeight: number,
  numberOfLines?: number
) {
  const [matches, setMatches] = useState<Matches[]>([])
  const [lines, setLines] = useState<TextLayoutLine[]>([])
  const linesRef = useRef('')
  const [lineHeightIncrease, setLineHeightIncrease] = useState(0)

  /** 收到匹配信号后, 记录片假名, 相同的只记录首个 */
  const onKatakana = useCallback(({ jp, en }: { jp: string; en: string }) => {
    setMatches(prev => {
      if (prev.findIndex(item => item.jp === jp) !== -1) return prev
      return [...prev, { jp, en }]
    })
  }, [])

  /** 行布局有实际变化才更新, 避免循环 setState */
  const onTextLayout = useCallback(({ nativeEvent }: TextLayoutEvent) => {
    const signature = nativeEvent.lines
      .map(line => `${line.x},${line.y},${line.width},${line.height},${line.text}`)
      .join('|')
    if (signature === linesRef.current) return

    linesRef.current = signature
    setLines(nativeEvent.lines)
  }, [])

  /** 根据行坐标推算每个片假名出现的位置 */
  const measured = useMemo(
    () => getMeasuredMatches(matches, lines, size, baseSize, fullLineHeight, numberOfLines),
    [matches, lines, size, baseSize, fullLineHeight, numberOfLines]
  )

  /** 测量完成后决定是否仍需要撑高行高 (仅首行有罗马音时收敛为 0) */
  useEffect(() => {
    if (!lines.length) return
    setLineHeightIncrease(shouldIncreaseLineHeight(measured) ? LINE_HEIGHT_INCREASE : 0)
  }, [measured, lines])

  return {
    measured,
    lineHeightIncrease,
    onKatakana,
    onTextLayout
  }
}

export default useKatakanaController
