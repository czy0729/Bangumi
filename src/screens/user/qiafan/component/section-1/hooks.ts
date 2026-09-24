/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { useEffect, useState } from 'react'
import { WEEKS_DEFAULT_COUNT } from './ds'

import type { Week } from '../../github'

/** 图表显示区间: 长度固定, 只能左右平移 */
export function useWeekRange(weeks: Week[]) {
  const maxStart = Math.max(weeks.length - WEEKS_DEFAULT_COUNT, 0)
  const [start, setStart] = useState(maxStart)

  /** 数据刷新后区间重置回末尾 (最新一年) */
  useEffect(() => {
    setStart(Math.max(weeks.length - WEEKS_DEFAULT_COUNT, 0))
  }, [weeks])

  /** 渲染期收敛, 不依赖额外一次 setStart 才生效 */
  const clampedStart = Math.min(start, maxStart)

  return {
    start: clampedStart,
    end: Math.min(clampedStart + WEEKS_DEFAULT_COUNT - 1, weeks.length - 1),

    /** 平移到指定起始下标 (超出的部分在内部收敛) */
    moveTo(index: number) {
      setStart(Math.min(Math.max(index, 0), maxStart))
    }
  }
}
