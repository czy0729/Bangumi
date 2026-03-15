/*
 * @Author: czy0729
 * @Date: 2025-02-28 14:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-15 06:26:42
 */
import { useCallback, useRef } from 'react'

import type { ScrollTo } from '@components'

/** 开发调试工具页面逻辑 */
export function useDEVPage() {
  const scrollToRef = useRef<ScrollTo>(null)
  const handleForwardRef = useCallback((scrollTo: ScrollTo) => {
    scrollToRef.current = scrollTo
  }, [])
  const handleScrollTo = useCallback((y: number) => {
    if (typeof scrollToRef.current === 'function') {
      scrollToRef.current({
        x: 0,
        y,
        animated: true
      })
    }
  }, [])

  return {
    handleForwardRef,
    handleScrollTo
  }
}
