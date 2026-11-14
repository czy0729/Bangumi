/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 找三次元分面维度: 桶语义与 search 谓词一致 (scripts/generate-filter-counts.js 构建期校验)
 */
import { REAL_FORM, REAL_NSFW, REAL_REGION, REAL_TAGS, REAL_YEAR } from './ds'
import { createYearBucket } from '../facet'

import type { FacetDim } from '../facet'
import type { Item } from './types'

const yearBucket = createYearBucket(REAL_YEAR)

/**
 * g / f 维度: 1-based, 「其他」(末位) 命中缺席值
 *  - 与 matchIndexed 一致: 值恰为「其他」下标 + 1 时不命中任何候选
 */
function indexedBucket(value: number | undefined, length: number) {
  if (!value) return length - 1
  const index = value - 1
  if (index < 0 || index >= length - 1) return -1
  return index
}

export const FACET_DIMS: readonly FacetDim<Item>[] = [
  { key: 'region', values: REAL_REGION, bucketsOf: item => indexedBucket(item.g, REAL_REGION.length) },
  { key: 'year', values: REAL_YEAR, bucketsOf: item => yearBucket(item.d) },
  { key: 'form', values: REAL_FORM, bucketsOf: item => indexedBucket(item.f, REAL_FORM.length) },
  { key: 'tag', values: REAL_TAGS, bucketsOf: item => item.t || [] },
  { key: 'x', values: REAL_NSFW, bucketsOf: item => (item.x === 1 ? 0 : 1) }
]
