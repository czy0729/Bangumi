/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 找游戏分面维度: 桶语义与 search 谓词一致 (scripts/generate-filter-counts.js 构建期校验)
 */
import {
  GAME_CATE,
  GAME_DEV,
  GAME_DEV_ALIAS,
  GAME_DEV_MAP,
  GAME_NSFW,
  GAME_PLATFORM,
  GAME_PUB,
  GAME_PUB_ALIAS,
  GAME_PUB_MAP,
  GAME_TAGS,
  GAME_YEAR
} from './ds'
import { createYearBucket } from '../facet'

import type { FacetDim } from '../facet'
import type { Item } from './types'

const yearBucket = createYearBucket(GAME_YEAR)

/** 开发商 / 发行商: 名 → 可命中的下标集合 (0-based, 别名同组共享), 与 index 一致 */
function createMatchNums(map: Record<string, number>, aliasGroups: readonly (readonly string[])[]) {
  const nums: Record<string, number[]> = {}
  Object.keys(map).forEach(name => {
    nums[name] = [map[name]]
  })
  aliasGroups.forEach(group => {
    const groupNums = group.filter(name => name in map).map(name => map[name])
    if (groupNums.length < 2) return
    group.forEach(name => {
      if (name in nums) nums[name] = groupNums
    })
  })
  return nums
}

/** 下标值 → 命中的候选下标集 (倒排; item 的 d / p 为下标数组, 任一命中即计入) */
function createInverted(names: readonly string[], nums: Record<string, number[]>) {
  const byIndex = new Map<number, number[]>()
  names.forEach((name, index) => {
    ;(nums[name] || []).forEach(value => {
      const list = byIndex.get(value) || []
      list.push(index)
      byIndex.set(value, list)
    })
  })
  return (values: readonly number[] | undefined) => {
    if (!values?.length) return [] as number[]
    const result: number[] = []
    const seen = new Set<number>()
    values.forEach(value => {
      ;(byIndex.get(value) || []).forEach(index => {
        if (!seen.has(index)) {
          seen.add(index)
          result.push(index)
        }
      })
    })
    return result
  }
}

const devBuckets = createInverted(GAME_DEV, createMatchNums(GAME_DEV_MAP, GAME_DEV_ALIAS))
const pubBuckets = createInverted(GAME_PUB, createMatchNums(GAME_PUB_MAP, GAME_PUB_ALIAS))

export const FACET_DIMS: readonly FacetDim<Item>[] = [
  { key: 'year', values: GAME_YEAR, bucketsOf: item => yearBucket(item.en) },
  { key: 'platform', values: GAME_PLATFORM, bucketsOf: item => item.pl || [] },
  { key: 'cate', values: GAME_CATE, bucketsOf: item => item.ta || [] },
  { key: 'tag', values: GAME_TAGS, bucketsOf: item => item.tg || [] },
  { key: 'dev', values: GAME_DEV, bucketsOf: item => devBuckets(item.d) },
  { key: 'pub', values: GAME_PUB, bucketsOf: item => pubBuckets(item.p) },
  { key: 'x', values: GAME_NSFW, bucketsOf: item => (item.x === 1 ? 0 : 1) }
]
