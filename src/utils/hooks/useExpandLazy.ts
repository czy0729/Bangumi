/*
 * @Author: czy0729
 * @Date: 2023-01-30 09:26:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-19 22:13:29
 */
import { useCallback, useState } from 'react'

/**
 * 用于展开块初次进入时, 减少渲染看不见的区域
 * @param {array} data 待折叠数据
 * @param {number} lazyRenderedCount 默认展示数据条数
 */
export default function useExpandLazy<T extends readonly U[], U = T[number]>(
  data: readonly U[] = [],
  lazyRenderedCount: number = 2
) {
  const [expand, setExpand] = useState(false)

  const list: readonly U[] = expand ? data : data.slice(0, lazyRenderedCount)

  const handleExpand = useCallback(() => {
    setExpand(true)
  }, [setExpand])

  return {
    list,
    onExpand: handleExpand
  }
}
