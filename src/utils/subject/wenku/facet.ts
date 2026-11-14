/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 找文库分面维度: 桶语义与 search 谓词一致 (scripts/generate-filter-counts.js 构建期校验)
 */
import {
  WENKU_ANIME,
  WENKU_AUTHORS,
  WENKU_CATES,
  WENKU_NSFW,
  WENKU_PUBLISHERS,
  WENKU_TAGS,
  WENKU_VOL,
  WENKU_VOL_RANGE,
  WENKU_YEAR
} from './ds'
import { createRangeBuckets, createYearBucket } from '../facet'

import type { FacetDim } from '../facet'
import type { Item } from './types'

const yearBucket = createYearBucket(WENKU_YEAR)
const volBuckets = createRangeBuckets(WENKU_VOL, WENKU_VOL_RANGE)

export const FACET_DIMS: readonly FacetDim<Item>[] = [
  { key: 'start', values: WENKU_YEAR, bucketsOf: item => yearBucket(item.st || item.d) },
  { key: 'update', values: WENKU_YEAR, bucketsOf: item => yearBucket(item.ud || item.d) },
  { key: 'end', values: WENKU_YEAR, bucketsOf: item => yearBucket(item.ed) },
  { key: 'publisher', values: WENKU_PUBLISHERS, bucketsOf: item => item.p || [] },
  {
    key: 'cate',
    values: WENKU_CATES,
    bucketsOf: item => (item.c && item.c <= WENKU_CATES.length ? item.c - 1 : -1)
  },
  { key: 'tag', values: WENKU_TAGS, bucketsOf: item => item.t || [] },
  { key: 'vol', values: WENKU_VOL, bucketsOf: item => volBuckets(item.v) },
  { key: 'author', values: WENKU_AUTHORS, bucketsOf: item => item.a || [] },
  { key: 'anime', values: WENKU_ANIME, bucketsOf: item => (item.m === 1 ? 0 : 1) },
  { key: 'x', values: WENKU_NSFW, bucketsOf: item => (item.x === 1 ? 0 : 1) }
]
