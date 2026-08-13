/*
 * @Author: czy0729
 * @Date: 2026-08-12 11:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 11:00:00
 */
import { useState } from 'react'

import type { TextInputContentSizeChangeEvent } from 'react-native'
import type { TextareaChangeEvent, UseTextareaItemOptions } from './types'

/** 文本域输入状态与尺寸测量 */
export const useTextareaItem = ({
  value,
  autoHeight = false,
  itemHeight,
  onChange,
  onContentSizeChange
}: UseTextareaItemOptions) => {
  const [inputCount, setInputCount] = useState(typeof value === 'string' ? value.length : 0)
  const [measuredHeight, setMeasuredHeight] = useState(0)

  const handleChange = (e: TextareaChangeEvent) => {
    const text = e.nativeEvent.text
    setInputCount(text.length)
    if (onChange) onChange(text)
  }

  const handleContentSizeChange = (e: TextInputContentSizeChangeEvent) => {
    const height = autoHeight ? e.nativeEvent.contentSize.height : itemHeight
    setMeasuredHeight(height)
    if (onContentSizeChange) onContentSizeChange(e)
  }

  const height = measuredHeight || itemHeight

  return { inputCount, height, handleChange, handleContentSizeChange }
}
