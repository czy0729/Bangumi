/*
 * @Author: czy0729
 * @Date: 2026-06-25 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-25 10:08:02
 */
import { useCallback, useMemo, useState } from 'react'
import { copy, feedback, getVisualLength, HTMLDecode, stl } from '@utils'
import { REG_SPLIT } from './ds'
import { memoStyles } from './styles'

import type { TextStyle } from '@types'
import type { TextLayoutEvent } from 'react-native'

/** 管理评论文本的展开/收起/测量逻辑 */
export function useComments(value: string, numberOfLines: number | undefined, style?: TextStyle) {
  const [lines, setLines] = useState<number | undefined>(undefined)
  const [isOverflow, setIsOverflow] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [useSplit, setUseSplit] = useState(false)
  const [maxLengthExpanded, setMaxLengthExpanded] = useState(false)

  // 处理文本：HTML 解码、换行逻辑
  const processedValue = useMemo(() => {
    let text = HTMLDecode((value || '').replace(/\r\n/g, ''))
    if (isExpanded && useSplit) text = text.replace(REG_SPLIT, '//\n')
    return text
  }, [value, isExpanded, useSplit])

  // 点击展开/切换换行
  const handlePress = useCallback(() => {
    if (!isExpanded) {
      if (isOverflow) {
        setLines(100)
        feedback(true)
      } else {
        const rawText = HTMLDecode((value || '').replace(/\r\n/g, ''))
        const processedText = rawText.replace(REG_SPLIT, '//\n')
        if (processedText !== rawText) {
          setUseSplit(true)
          feedback(true)
        }
      }
      setIsExpanded(true)
    } else {
      const rawText = HTMLDecode((value || '').replace(/\r\n/g, ''))
      const processedText = rawText.replace(REG_SPLIT, '//\n')
      if (processedText !== rawText) {
        setUseSplit(!useSplit)
        feedback(true)
      }
    }
  }, [isExpanded, useSplit, isOverflow, value])

  // 测量实际行数，判断是否溢出
  const handleTextLayout = useCallback(
    (e: TextLayoutEvent) => {
      if (!isReady) {
        const actualLineCount = e.nativeEvent.lines.length
        if (numberOfLines && actualLineCount > numberOfLines) {
          setIsOverflow(true)
          setLines(numberOfLines)
        } else {
          setIsOverflow(false)
          setLines(undefined)
        }
        setIsReady(true)
      }
    },
    [numberOfLines, isReady]
  )

  // 长按复制
  const handleLongPress = useCallback(() => {
    copy(processedValue, '已复制评论')
  }, [processedValue])

  // 样式
  const styles = memoStyles()
  const visualLength = getVisualLength(processedValue)
  const size = visualLength >= 80 ? 13 : 14
  const textStyle = useMemo(
    () => stl(styles.comments, style, !isReady && { opacity: 0 }),
    [styles.comments, style, isReady]
  )

  return {
    lines,
    isReady,
    processedValue,
    maxLengthExpanded,
    setMaxLengthExpanded,
    handlePress,
    handleTextLayout,
    handleLongPress,
    size,
    textStyle
  }
}
