/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 找漫画分面维度: 桶语义与 search 谓词一致 (scripts/generate-filter-counts.js 构建期校验)
 */
import {
  MANGA_CH,
  MANGA_CH_RANGE,
  MANGA_NSFW,
  MANGA_PUBLISHERS,
  MANGA_TAG_ALIAS,
  MANGA_TAGS,
  MANGA_VOL,
  MANGA_VOL_RANGE,
  MANGA_YEAR
} from './ds'
import { createAliasBuckets, createRangeBuckets, createYearBucket } from '../facet'

import type { FacetDim } from '../facet'
import type { Item } from './types'

const yearBucket = createYearBucket(MANGA_YEAR)
const tagBuckets = createAliasBuckets(MANGA_TAGS, MANGA_TAG_ALIAS)
const volBuckets = createRangeBuckets(MANGA_VOL, MANGA_VOL_RANGE)
const chBuckets = createRangeBuckets(MANGA_CH, MANGA_CH_RANGE)

export const FACET_DIMS: readonly FacetDim<Item>[] = [
  { key: 'start', values: MANGA_YEAR, bucketsOf: item => yearBucket(item.st || item.d) },
  { key: 'update', values: MANGA_YEAR, bucketsOf: item => yearBucket(item.ud || item.d) },
  { key: 'end', values: MANGA_YEAR, bucketsOf: item => yearBucket(item.ed) },
  { key: 'publisher', values: MANGA_PUBLISHERS, bucketsOf: item => item.p || [] },
  { key: 'tag', values: MANGA_TAGS, bucketsOf: item => tagBuckets(item.t) },
  { key: 'vol', values: MANGA_VOL, bucketsOf: item => volBuckets(item.v) },
  { key: 'ch', values: MANGA_CH, bucketsOf: item => chBuckets(item.c) },
  { key: 'x', values: MANGA_NSFW, bucketsOf: item => (item.x === 1 ? 0 : 1) }
]
