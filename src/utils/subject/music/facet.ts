/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 找音乐分面维度: 桶语义与 search 谓词一致 (scripts/generate-filter-counts.js 构建期校验)
 */
import { MUSIC_NSFW, MUSIC_TAG_ALIAS, MUSIC_TAGS, MUSIC_YEAR } from './ds'
import { createAliasBuckets, createYearBucket } from '../facet'

import type { FacetDim } from '../facet'
import type { Item } from './types'

const yearBucket = createYearBucket(MUSIC_YEAR)
const tagBuckets = createAliasBuckets(MUSIC_TAGS, MUSIC_TAG_ALIAS)

export const FACET_DIMS: readonly FacetDim<Item>[] = [
  { key: 'year', values: MUSIC_YEAR, bucketsOf: item => yearBucket(item.d) },
  { key: 'tag', values: MUSIC_TAGS, bucketsOf: item => tagBuckets(item.t) },
  { key: 'x', values: MUSIC_NSFW, bucketsOf: item => (item.x === 1 ? 0 : 1) }
]
