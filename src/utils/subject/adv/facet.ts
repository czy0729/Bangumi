/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 找ADV分面维度: 桶语义与 search 谓词一致 (scripts/generate-filter-counts.js 构建期校验)
 */
import {
  ADV_CN,
  ADV_DEV,
  ADV_DEV_ALIAS,
  ADV_DEV_MAP,
  ADV_NSFW,
  ADV_PLATFORM,
  ADV_PLAYTIME,
  ADV_PLAYTIME_MAP,
  ADV_TAGS,
  ADV_YEAR
} from './ds'
import { createYearBucket } from '../facet'

import type { FacetDim } from '../facet'
import type { Item } from './types'

const yearBucket = createYearBucket(ADV_YEAR)

/** 开发商: 名 → 可命中的 d 集合 (1-based, 别名同组共享), 与 index 的 DEV_MATCH 一致 */
const DEV_NUMS: Record<string, number[]> = {}
Object.keys(ADV_DEV_MAP).forEach(name => {
  DEV_NUMS[name] = [ADV_DEV_MAP[name]]
})
ADV_DEV_ALIAS.forEach(group => {
  const nums = group.filter(name => name in ADV_DEV_MAP).map(name => ADV_DEV_MAP[name])
  if (nums.length < 2) return
  group.forEach(name => {
    if (name in DEV_NUMS) DEV_NUMS[name] = nums
  })
})

/** d 值 → 命中的开发商下标集 (倒排) */
const DEV_BY_D = new Map<number, number[]>()
ADV_DEV.forEach((name, index) => {
  ;(DEV_NUMS[name] || []).forEach(num => {
    const list = DEV_BY_D.get(num) || []
    list.push(index)
    DEV_BY_D.set(num, list)
  })
})

/** 时长 t → ADV_PLAYTIME 下标 (缺席 = 不明) */
const PLAYTIME_BY_T = new Map<number, number>()
Object.keys(ADV_PLAYTIME_MAP).forEach(name => {
  const index = ADV_PLAYTIME.indexOf(name as (typeof ADV_PLAYTIME)[number])
  if (index >= 0) PLAYTIME_BY_T.set(ADV_PLAYTIME_MAP[name], index)
})

export const FACET_DIMS: readonly FacetDim<Item>[] = [
  { key: 'year', values: ADV_YEAR, bucketsOf: item => yearBucket(item.en) },
  { key: 'platform', values: ADV_PLATFORM, bucketsOf: item => item.pl || [] },
  { key: 'tag', values: ADV_TAGS, bucketsOf: item => item.ta || [] },
  {
    key: 'playtime',
    values: ADV_PLAYTIME,
    bucketsOf: item => {
      if (!item.t) return ADV_PLAYTIME.indexOf('不明')
      return PLAYTIME_BY_T.get(item.t) ?? -1
    }
  },
  {
    key: 'dev',
    values: ADV_DEV,
    bucketsOf: item => (item.d ? DEV_BY_D.get(item.d) || [] : [])
  },
  { key: 'cn', values: ADV_CN, bucketsOf: item => (item.cn && item.cn >= 1 ? 0 : 1) },
  { key: 'x', values: ADV_NSFW, bucketsOf: item => (item.x === 1 ? 0 : 1) }
]
