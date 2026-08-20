/*
 * @Author: czy0729
 * @Date: 2026-08-20 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 00:00:00
 */
import { useCallback, useEffect, useState } from 'react'
import { removeSpecCharacters } from './utils'

import type { TextLayoutEvent } from 'react-native'
import type { UseVerticalAlignDetectionParams } from './types'

const memo = new Map<string, boolean>()

/** 防止缓存无限增长, 超限时清空 */
function setMemo(key: string, value: boolean) {
  if (memo.size >= 500) memo.clear()
  memo.set(key, value)
}

/** 检测文本是否包含需要优化的特殊字符 */
export function useVerticalAlignDetection({ text, onHit }: UseVerticalAlignDetectionParams) {
  const [flag, setFlag] = useState(typeof text === 'string' && text && memo.get(text) === true)

  const handleTextLayout = useCallback(
    (e: TextLayoutEvent) => {
      if (flag) return

      if (typeof text === 'string' && text) {
        const next = e.nativeEvent.lines?.[0]?.ascender <= 2
        if (next) setFlag(true)
        setMemo(text, next)
      }
    },
    [flag, text]
  )

  useEffect(() => {
    if (flag && typeof onHit === 'function') onHit(removeSpecCharacters(text))
  }, [flag, text, onHit])

  return {
    /** 是否需要优化 */
    flag,

    /** 文本布局回调 */
    handleTextLayout,

    /** 该 text 是否已有缓存结果 */
    hasMemo: memo.has(text)
  }
}
