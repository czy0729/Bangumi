/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:45:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 01:09:54
 */
import React, { useCallback, useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { copy, getVisualLength, HTMLDecode, stl } from '@utils'
import { memoStyles } from './styles'

import type { TextLayoutEvent } from 'react-native'
import type { Props } from './types'

export const REG_SPLIT = /(?!\/(?:[A-Za-z0-9]{1,2}\/)+)(?:\s*\/\s*)+/g

function Comments({ style, numberOfLines, value }: Props) {
  // 初始 lines 设为 undefined，以便测量真实高度
  const [lines, setLines] = useState<number | undefined>(undefined)
  const [isOverflow, setIsOverflow] = useState(false)

  // 准备就绪的状态，防止测量时的“跳动”闪烁
  const [isReady, setIsReady] = useState(false)

  // 记录是否已经展开过
  const [isExpanded, setIsExpanded] = useState(false)

  // 记录是否应用正则换行逻辑
  const [useSplit, setUseSplit] = useState(false)

  // 处理文本逻辑
  const processedValue = useMemo(() => {
    let text = HTMLDecode((value || '').replace(/\r\n/g, ''))

    // 如果已经展开过，或者本来就不需要展开（初始未溢出），则根据 useSplit 切换逻辑
    // 注意：只要点击过，isExpanded 就会变为 true
    if (isExpanded && useSplit) text = text.replace(REG_SPLIT, '//\n')

    return text
  }, [value, isExpanded, useSplit])

  const handlePress = useCallback(() => {
    if (!isExpanded) {
      // 第一次点击：
      // 如果是溢出的，先展开行数；如果不溢出，直接开启换行逻辑
      if (isOverflow) {
        setLines(100)
      } else {
        setUseSplit(true)
      }
      setIsExpanded(true)
    } else {
      // 已经点击过：切换换行逻辑
      setUseSplit(!useSplit)
    }
  }, [isExpanded, useSplit, isOverflow])

  const handleTextLayout = useCallback(
    (e: TextLayoutEvent) => {
      // 只有在还没准备好（测量阶段）时执行此逻辑
      if (!isReady) {
        const actualLineCount = e.nativeEvent.lines.length

        if (numberOfLines && actualLineCount > numberOfLines) {
          // 测量到溢出，缩回指定行数
          setIsOverflow(true)
          setLines(numberOfLines)
        } else {
          // 没溢出，保持不限制
          setIsOverflow(false)
          setLines(undefined)
        }
        // 标记测量完成
        setIsReady(true)
      }
    },
    [numberOfLines, isReady]
  )

  const handleLongPress = useCallback(() => {
    copy(processedValue, '已复制评论')
  }, [processedValue])

  const styles = memoStyles()

  const visualLength = getVisualLength(processedValue)
  const size = visualLength >= 80 ? 13 : 14

  // 测量期间隐藏文本，避免闪烁
  const textStyle = useMemo(
    () => stl(styles.comments, style, !isReady && { opacity: 0 }),
    [styles.comments, style, isReady]
  )

  return (
    <Text
      style={textStyle}
      size={size}
      lineHeight={16}
      numberOfLines={lines}
      onTextLayout={handleTextLayout}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      {processedValue}
    </Text>
  )
}

export default observer(Comments)
