/*
 * @Author: czy0729
 * @Date: 2024-03-29 11:28:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 17:40:00
 */
import { desc, getOnAirItem } from '@utils'
import { ensureCacheLimit } from '@utils/cache'

import type { Calendar } from '@stores/calendar/types'

type Data = {
  /** 可选改编菜单（首项固定「全部」） */
  adapts: string[]

  /** 可选动画制作菜单（首项固定「全部」） */
  origins: string[]

  /** 可选标签菜单（首项固定「全部」） */
  tags: string[]
}

const cacheMap = new Map<string, Data>()

/** 构建缓存 key（全量条目 id 拼接, 精确且远小于整表 JSON） */
function getCacheKey(data: Calendar['list']) {
  return data.map(({ items }) => items.map(({ id }) => id).join(',')).join(',')
}

/** 条目计数并按数量降序转成菜单数据（首项固定「全部」） */
function toMenuData(record: Record<string, number>) {
  return [
    '全部',
    ...Object.entries(record)
      .sort((a, b) => desc(a[1], b[1]))
      .map(([key, value]) => `${key} (${value})`)
  ]
}

/** 构建筛选数据 */
export function getData(data: Calendar['list']) {
  const key = getCacheKey(data)
  const cached = cacheMap.get(key)
  if (cached) return cached

  try {
    const adapts: Record<string, number> = {}
    const origins: Record<string, number> = {}
    const tags: Record<string, number> = {}

    data.forEach(({ items }) => {
      items.forEach(({ id }) => {
        const { type: adapt, origin, tag } = getOnAirItem(id)

        if (adapt) adapts[adapt] = (adapts[adapt] || 0) + 1

        if (origin) {
          origin.split('/').forEach(item => {
            const value = item.trim()
            origins[value] = (origins[value] || 0) + 1
          })
        }

        if (tag) {
          tag.split('/').forEach(item => {
            const value = item.trim()
            tags[value] = (tags[value] || 0) + 1
          })
        }
      })
    })

    const result: Data = {
      adapts: toMenuData(adapts),
      origins: toMenuData(origins),
      tags: toMenuData(tags)
    }
    cacheMap.set(key, result)
    ensureCacheLimit(cacheMap, 12)

    return result
  } catch {}

  return {
    adapts: [],
    origins: [],
    tags: []
  } as Data
}
