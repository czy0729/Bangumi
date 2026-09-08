/*
 * @Author: czy0729
 * @Date: 2026-09-08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * 敏感条目判断（nsfw ID 集合 + 关键词, 归并自 data-source.ts）
 */
import { getJSON } from '@assets/json'
import { ensureCacheLimit } from '../cache'
import {
  NSFW_CACHE_MAP,
  NSFW_CACHE_MAX,
  NSFW_KEYWORDS,
  X18_DS,
  X18S_CACHE_MAP,
  X18S_CACHE_MAX
} from './ds'

import type { SubjectId } from '@types'

let NSFW_SET: Set<number> | null = null

/** 是否敏感条目 */
export function x18(subjectId: SubjectId, title?: string): boolean {
  if (!subjectId) return false

  // 懒加载敏感 ID 集合（空数组时允许重试）
  if (!NSFW_SET || !NSFW_SET.size) {
    const ids: number[] = getJSON('nsfw_id_distribution', [], true)
    if (!ids.length) return false
    NSFW_SET = new Set(ids)
  }

  // string → number 统一格式
  if (typeof subjectId === 'string') {
    subjectId = Number(subjectId.replace('/subject/', ''))
  }

  // 命中缓存直接返回
  if (NSFW_CACHE_MAP.has(subjectId)) return NSFW_CACHE_MAP.get(subjectId)!

  const result =
    NSFW_SET.has(subjectId) || (title ? NSFW_KEYWORDS.some(k => title.includes(k)) : false)

  NSFW_CACHE_MAP.set(subjectId, result)
  ensureCacheLimit(NSFW_CACHE_MAP, NSFW_CACHE_MAX)
  return result
}

/** 猜测是否敏感字符串 */
export function x18s(str: string) {
  const _str = String(str).toLowerCase()

  // 以词库长度作为缓存 key 的一部分, 词库变更时旧缓存自动失效
  const key = `${X18_DS.length}|${_str}`
  if (X18S_CACHE_MAP.has(key)) return X18S_CACHE_MAP.get(key)!

  const result = X18_DS.some(item => _str.includes(item))
  X18S_CACHE_MAP.set(key, result)
  ensureCacheLimit(X18S_CACHE_MAP, X18S_CACHE_MAX)
  return result
}
