/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 找Hentai分面维度: 桶语义与 search 谓词一致 (scripts/generate-filter-counts.js 构建期校验)
 *  - 人物 / 职业 / 外貌 / 剧情共享 t 下标段, 与 getTagType 的分组区间一致
 */
import { HENTAI_BODY, HENTAI_CHARA, HENTAI_CONTENT, HENTAI_JOB, HENTAI_YEAR } from './ds'
import { createYearBucket } from '../facet'

import type { FacetDim } from '../facet'
import type { Item } from './types'

const yearBucket = createYearBucket(HENTAI_YEAR)

const CHARA_LENGTH = HENTAI_CHARA.length
const JOB_LENGTH = HENTAI_JOB.length
const BODY_LENGTH = HENTAI_BODY.length

/** t 为合并 HENTAI_TAGS 下标, 各维桶需转为维度内下标 */
function inRange(tags: readonly number[] | undefined, min: number, max: number) {
  return (tags || []).filter(tag => tag >= min && tag < max)
}

function toLocal(tags: readonly number[] | undefined, min: number, max: number, offset: number) {
  return inRange(tags, min, max).map(tag => tag - offset)
}

export const FACET_DIMS: readonly FacetDim<Item>[] = [
  { key: 'year', values: HENTAI_YEAR, bucketsOf: item => yearBucket(item.a) },
  {
    key: 'chara',
    values: HENTAI_CHARA,
    bucketsOf: item => inRange(item.t, 0, CHARA_LENGTH)
  },
  {
    key: 'job',
    values: HENTAI_JOB,
    bucketsOf: item => toLocal(item.t, CHARA_LENGTH, CHARA_LENGTH + JOB_LENGTH, CHARA_LENGTH)
  },
  {
    key: 'body',
    values: HENTAI_BODY,
    bucketsOf: item =>
      toLocal(
        item.t,
        CHARA_LENGTH + JOB_LENGTH,
        CHARA_LENGTH + JOB_LENGTH + BODY_LENGTH,
        CHARA_LENGTH + JOB_LENGTH
      )
  },
  {
    key: 'content',
    values: HENTAI_CONTENT,
    bucketsOf: item => toLocal(item.t, CHARA_LENGTH + JOB_LENGTH + BODY_LENGTH, Infinity, CHARA_LENGTH + JOB_LENGTH + BODY_LENGTH)
  }
]
