/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 找NSFW分面维度: 桶语义与 search 谓词一致 (scripts/generate-filter-counts.js 构建期校验)
 */
import { MODEL_SUBJECT_TYPE } from '@constants'
import { NSFW_TAGS, NSFW_TYPE, NSFW_YEAR } from './ds'
import { createYearBucket } from '../facet'

import type { FacetDim } from '../facet'
import type { Item } from './types'

const yearBucket = createYearBucket(NSFW_YEAR)

/** 类型: 条目 t (SUBJECT_TYPE value) → NSFW_TYPE 下标, 与 MODEL_SUBJECT_TYPE.getValue 一致 */
const TYPE_BY_T = new Map<number, number>()
NSFW_TYPE.forEach((label, index) => {
  const value = Number(MODEL_SUBJECT_TYPE.getValue(label))
  if (value) TYPE_BY_T.set(value, index)
})

export const FACET_DIMS: readonly FacetDim<Item>[] = [
  { key: 'year', values: NSFW_YEAR, bucketsOf: item => yearBucket(item.d) },
  { key: 'type', values: NSFW_TYPE, bucketsOf: item => TYPE_BY_T.get(item.t) ?? -1 },
  { key: 'tag', values: NSFW_TAGS, bucketsOf: item => item.tg || [] }
]
