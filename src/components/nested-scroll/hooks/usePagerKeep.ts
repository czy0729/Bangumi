/*
 * @Author: czy0729
 * @Date: 2026-09-23 08:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 08:30:01
 */
import { useEffect, useRef, useState } from 'react'

/**
 * Pager 保活区间
 *
 * 取停稳页 / 目标页 / 滚动视野经过页的并集, 覆盖跨页跳转与手势拖动经过的中间页。
 * 停稳信号只能用 isIdle, setPage 会立即把 page 置为目标页;
 * 手势拖动期间 page 不更新 (onPageSelected 在动画结束才触发), 故用 scrollRange 实时锚定视野
 */
export function usePagerKeep({
  page,
  isIdle,
  scrollRange,
  distance
}: {
  /** 当前页码 */
  page: number

  /** Pager 是否停稳 */
  isIdle: boolean

  /** 滚动中视野覆盖的页码区间 (手势拖动经过的中间页) */
  scrollRange: readonly [number, number]

  /** 相邻页保活距离 */
  distance: number
}): readonly [number, number] {
  const settledRef = useRef(page)
  const movingRef = useRef(false)
  const [range, setRange] = useState<readonly [number, number]>(() => [
    page - distance,
    page + distance
  ])

  // 锚点并集: 停稳页 / 目标页 / 滚动视野经过页 —— 手势跨页拖动时 page 不变, 靠 scrollRange 兜住中间页
  useEffect(() => {
    const from = Math.min(settledRef.current, page, scrollRange[0]) - distance
    const to = Math.max(settledRef.current, page, scrollRange[1]) + distance

    setRange(prev => (prev[0] === from && prev[1] === to ? prev : [from, to]))
  }, [page, scrollRange, distance])

  useEffect(() => {
    if (!isIdle) {
      movingRef.current = true
      return
    }

    // 只收缩进入过移动态后的这次停稳, 避免页码变更当帧未开始滚动就收缩
    if (!movingRef.current) return

    movingRef.current = false
    settledRef.current = page
    setRange(prev => {
      const from = page - distance
      const to = page + distance

      return prev[0] === from && prev[1] === to ? prev : [from, to]
    })
  }, [isIdle, page, distance])

  return range
}
