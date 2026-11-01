/*
 * @Author: czy0729
 * @Date: 2025-02-28 14:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 05:52:07
 *
 * 开发调试工具页面逻辑
 */
import { useCallback, useRef } from 'react'

import type { ScrollTo } from '@components'

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
    /** ScrollView ref 转发 */
    handleForwardRef,

    /** 输入框聚焦时滚动到可视区 */
    handleScrollTo
  }
}
