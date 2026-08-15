/*
 * @Author: czy0729
 * @Date: 2026-08-15 05:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 07:37:05
 */
import { useCallback, useMemo, useRef, useState } from 'react'
import { getMeasuredMatches } from './utils'

import type { TextLayoutEvent, TextLayoutLine } from 'react-native'
import type { Matches } from './types'

/**
 * 片假名测量控制器, 由 Provider 消费
 *  - 收集匹配到的片假名, 并通过真实渲染 Text 的 onTextLayout 测量每行坐标
 *  - 按行内比例推算每个片假名出现的位置
 */
export function useKatakanaController() {
  const [matches, setMatches] = useState<Matches[]>([])
  const [lines, setLines] = useState<TextLayoutLine[]>([])
  const linesRef = useRef('')

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
  const measured = useMemo(() => getMeasuredMatches(matches, lines), [matches, lines])

  return {
    measured,
    onKatakana,
    onTextLayout
  }
}

export default useKatakanaController
