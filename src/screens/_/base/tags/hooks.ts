/*
 * @Author: czy0729
 * @Date: 2026-08-20 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 12:00:00
 */
import { useMemo } from 'react'

import type { Props } from './types'
import type { UseTagsDataResult } from './types'

/** 计算 tags 展示数据与截断信息 */
export function useTagsData(value: Props['value'] = [], limit: Props['limit']): UseTagsDataResult {
  const hasLimit = limit !== undefined && value.length > limit
  const data = useMemo(
    () => (hasLimit ? value.slice(0, limit) : value).map(id => ({ id })),
    [value, limit, hasLimit]
  )
  const extraCount = hasLimit ? value.length - limit : 0

  return {
    /** 是否触发了截断 */
    hasLimit,

    /** 待渲染数据 */
    data,

    /** 被截断的数量 */
    extraCount
  }
}
