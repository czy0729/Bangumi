/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 找画集分面维度: 桶语义与 search 谓词一致 (scripts/generate-filter-counts.js 构建期校验)
 */
import {
  ALBUM_AUTHORS,
  ALBUM_CATES,
  ALBUM_NSFW,
  ALBUM_PUBLISHERS,
  ALBUM_TAGS,
  ALBUM_YEAR
} from './ds'
import { createYearBucket } from '../facet'

import type { FacetDim } from '../facet'
import type { Item } from './types'

const yearBucket = createYearBucket(ALBUM_YEAR)

export const FACET_DIMS: readonly FacetDim<Item>[] = [
  { key: 'year', values: ALBUM_YEAR, bucketsOf: item => yearBucket(item.d) },
  { key: 'publisher', values: ALBUM_PUBLISHERS, bucketsOf: item => item.p || [] },
  {
    key: 'cate',
    values: ALBUM_CATES,
    bucketsOf: item => (item.c && item.c <= ALBUM_CATES.length ? item.c - 1 : -1)
  },
  { key: 'tag', values: ALBUM_TAGS, bucketsOf: item => item.t || [] },
  { key: 'author', values: ALBUM_AUTHORS, bucketsOf: item => item.a || [] },
  { key: 'x', values: ALBUM_NSFW, bucketsOf: item => (item.x === 1 ? 0 : 1) }
]
