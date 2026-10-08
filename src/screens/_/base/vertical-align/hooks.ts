/*
 * @Author: czy0729
 * @Date: 2026-08-20 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-08 05:26:39
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
  /** 已检测命中的文本, 与当前 text 不同时视为未命中 */
  const [hitText, setHitText] = useState<string | null>(null)
  const hit = hitText !== null && hitText === text
  const flag = (typeof text === 'string' && !!text && memo.get(text) === true) || hit

  const handleTextLayout = useCallback(
    (e: TextLayoutEvent) => {
      if (typeof text !== 'string' || !text) return

      // 命中态不重新测量: 行高已修正后再测会得出"不需要优化", 会把缓存写成 false
      if (flag) return

      const next = e.nativeEvent.lines?.[0]?.ascender <= 2
      memo.set(text, next)
      ensureCacheLimit(memo, CACHE_MAX)
      if (next) setHitText(text)
    },
    [flag, text]
  )

  useEffect(() => {
    // memo 有淘汰上限, 命中后写回 state, 避免缓存被淘汰后 flag 回退、已生效的行高修正被撤销
    if (flag && hitText !== text) setHitText(text)
  }, [flag, hitText, text])

  useEffect(() => {
    if (flag && typeof onHit === 'function') onHit(removeSpecCharacters(text))
  }, [flag, text, onHit])

  return {
    /** 是否需要优化 */
    flag,

    /** 文本布局回调 */
    handleTextLayout,

    /** 该 text 是否已有结果 (缓存或本次实例已命中) */
    hasMemo: memo.has(text) || hit
  }
}
