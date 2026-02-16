/*
 * @Author: czy0729
 * @Date: 2023-01-30 09:26:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-30 10:35:18
 */
import { useCallback, useState } from 'react'

/**
 * 用于展开块初次进入时, 减少渲染看不见的区域
 * @param {array} data 待折叠数据
 * @param {number} lazyRenderedCount 默认展示数据条数
 * @returns {object} list 展示数据，onExpand 展开数据
 */
export default function useExpandLazy<T>(data?: T[] | readonly T[], lazyRenderedCount: number = 2) {
  const [expand, setExpand] = useState(false)
  let list: typeof data
  if (data) {
    list = expand ? data : data.filter((_item, index) => index < lazyRenderedCount)
  }

  const onExpand = useCallback(() => {
    setExpand(true)
  }, [setExpand])

  return {
    list,
    onExpand
  }
}
