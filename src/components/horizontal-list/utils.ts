/*
 * @Author: czy0729
 * @Date: 2026-08-19 08:02:25
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 08:02:25
 */
import { desc } from '@utils'

import type { WithId } from './types'

/** 排序数据（没封面图的置后）并按需截取前 N 项 */
export function getListData<T extends WithId>(
  data: readonly T[],
  sortData: boolean,
  initialRenderNums: number,
  scrolled: boolean
): T[] {
  if (!data?.length) return []

  const sortedData = sortData
    ? [...data].sort((a, b) => desc(a, b, item => (item.image ? 1 : 0)))
    : [...data]
  if (!initialRenderNums || scrolled) return sortedData

  return sortedData.filter((_item, index) => index < initialRenderNums)
}
