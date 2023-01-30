/*
 * 用于展开块初次进入时, 减少渲染看不见的区域
 * @Author: czy0729
 * @Date: 2023-01-30 09:26:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-30 10:35:18
 */
import { useState, useCallback } from 'react'

export default function useExpandLazy<T>(data?: T[], lazyRenderedCount: number = 2) {
  const [expand, setExpand] = useState(false)
  let list: typeof data
  if (data) {
    list = expand ? data : data.filter((item, index) => index < lazyRenderedCount)
  }

  const onExpand = useCallback(() => {
    setExpand(true)
  }, [setExpand])

  return {
    list,
    onExpand
  }
}
