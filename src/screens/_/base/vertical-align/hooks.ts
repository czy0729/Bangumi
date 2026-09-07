/*
 * @Author: czy0729
 * @Date: 2026-08-20 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 23:37:45
 */
import { useCallback, useEffect, useState } from 'react'
import { ensureCacheLimit } from '@utils/cache'
import { removeSpecCharacters } from './utils'

import type { TextLayoutEvent } from 'react-native'
import type { UseVerticalAlignDetectionParams } from './types'

const memo = new Map<string, boolean>()

/** 缓存上限, 超限淘汰最早写入 */
const CACHE_MAX = 500

/** 检测文本是否包含需要优化的特殊字符 */
export function useVerticalAlignDetection({ text, onHit }: UseVerticalAlignDetectionParams) {
  const [flag, setFlag] = useState(typeof text === 'string' && text && memo.get(text) === true)

  const handleTextLayout = useCallback(
    (e: TextLayoutEvent) => {
      if (flag) return

      if (typeof text === 'string' && text) {
        const next = e.nativeEvent.lines?.[0]?.ascender <= 2
        if (next) setFlag(true)
        memo.set(text, next)
        ensureCacheLimit(memo, CACHE_MAX)
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
