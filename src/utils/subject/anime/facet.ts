/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 找番剧分面维度: 桶语义与 search 谓词一致 (scripts/generate-filter-counts.js 构建期校验)
 */
import {
  ANIME_AREA,
  ANIME_BEGIN,
  ANIME_EP,
  ANIME_META,
  ANIME_NSFW,
  ANIME_OFFICIAL,
  ANIME_STATUS,
  ANIME_TAGS,
  ANIME_YEAR,
  EP_RANGE,
  REG_SEASONS
} from './ds'
import { createYearBucket } from '../facet'

import type { FacetDim } from '../facet'
import type { Item } from './types'

const yearBucket = createYearBucket(ANIME_YEAR)

/** 放送月份 → 季度下标 (无月份 = 不命中) */
function beginBucket(value: string | undefined) {
  if (!value) return -1
  const splits = value.split('-')
  if (!splits[1]) return -1
  const marker = `${splits[0]}-${splits[1]}-`
  return ANIME_BEGIN.findIndex(begin => REG_SEASONS[begin]?.test(marker))
}

/** 集数 → 档位下标 (档位互斥, 无集数 = 不命中) */
function epBucket(value: number | undefined) {
  if (!value) return -1
  return ANIME_EP.findIndex(label => {
    const range = EP_RANGE[label]
    return value >= range[0] && (!range[1] || value <= range[1])
  })
}

export const FACET_DIMS: readonly FacetDim<Item>[] = [
  {
    key: 'area',
    values: ANIME_AREA,
    bucketsOf: item => {
      const code = item.ar || 'jp'
      if (code === 'jp') return 0
      if (code === 'cn') return 1
      if (code === 'ot') return 2
      return -1
    }
  },
  { key: 'meta', values: ANIME_META, bucketsOf: item => item.mt || [] },
  { key: 'year', values: ANIME_YEAR, bucketsOf: item => yearBucket(item.b) },
  { key: 'begin', values: ANIME_BEGIN, bucketsOf: item => beginBucket(item.b) },
  {
    key: 'status',
    values: ANIME_STATUS,
    bucketsOf: item => {
      // 与谓词一致: 其他 st 取值不命中任何分支, 视同全命中
      if (item.st === undefined) return ANIME_STATUS.indexOf('完结')
      if (item.st === 1) return ANIME_STATUS.indexOf('连载')
      if (item.st === 2) return ANIME_STATUS.indexOf('未播放')
      return [0, 1, 2]
    }
  },
  { key: 'ep', values: ANIME_EP, bucketsOf: item => epBucket(item.e) },
  { key: 'tags', values: ANIME_TAGS, bucketsOf: item => item.t || [] },
  { key: 'official', values: ANIME_OFFICIAL, bucketsOf: item => item.o || [] },
  { key: 'x', values: ANIME_NSFW, bucketsOf: item => (item.x === 1 ? 0 : 1) }
]
