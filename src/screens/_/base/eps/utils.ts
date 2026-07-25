/*
 * @Author: czy0729
 * @Date: 2026-07-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 10:00:00
 */
import type { Ep } from '@stores/subject/types'

/** 计算章节评论数的最小值和最大值 */
export function getComment(eps: readonly Ep[]) {
  if (!eps.length) return { min: 0, max: 0 }

  let min = Infinity
  let max = 0
  for (let i = 0, len = eps.length; i < len; i++) {
    const val = Number(eps[i].comment) || 1
    if (val < min) min = val
    if (val > max) max = val
  }
  return { min, max }
}
