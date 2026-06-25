/*
 * @Author: czy0729
 * @Date: 2026-06-25 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-25 00:38:54
 */
import { subjectStore } from '@stores'
import { desc, getTimestamp } from '@utils'

import type { List, ListItem } from '../types'

/**
 * 补全列表评分信息，仅当值有变化时才创建新对象，保持引用稳定。
 * 避免每次 computed 访问都产生全新数组和对象。
 */
export function enrichListWithScore(list: List): List {
  let changed = false
  const result = list.map(item => {
    const { id } = item || {}
    const score = subjectStore.ratingScore(id)
    const rank = subjectStore.ratingRank(id)
    const total = subjectStore.ratingTotal(id)
    if (item.score !== score || item.rank !== rank || item.total !== total) {
      changed = true
      return { ...item, score, rank, total }
    }
    return item
  })
  return changed ? result : list
}

/**
 * 从 info 字段提取第一个日期并解析为时间戳。
 * 支持格式：YYYY年M月D日、YYYY-MM-DD、YYYY、带括号备注、多个日期（取第一个）。
 */
function parseInfoTimestamp(info: string): number {
  const raw = String(info).split(' / ')?.[0]?.trim() || ''

  // 1. 用中文顿号或英文逗号分割多个日期，取第一个
  const first = raw.split(/[、,]/)[0].trim()

  // 2. 去掉括号内的备注文字（中英文括号）
  const cleaned = first.replace(/[（(][^）)]*[）)]/g, '').trim()

  // 3. 尝试中文格式：2025年9月26日
  const cnMatch = cleaned.match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/)
  if (cnMatch) {
    return getTimestamp(`${cnMatch[1]}年${cnMatch[2]}月${cnMatch[3]}日`, 'YYYY年M月D日') as number
  }

  // 4. 尝试 ISO 格式：2011-01-28 或 2013-3-31
  const isoMatch = cleaned.match(/(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (isoMatch) {
    return getTimestamp(`${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`) as number
  }

  // 5. 仅有年份：2023
  const yearMatch = cleaned.match(/^(\d{4})$/)
  if (yearMatch) {
    return getTimestamp(`${yearMatch[1]}-01-01`) as number
  }

  // 6. 兜底：让 dayjs 自行尝试解析
  return getTimestamp(cleaned) as number
}

/**
 * 按时间排序，预计算 timestamp Map 避免排序比较函数中 O(n log n) 次重复日期解析。
 * 使用 Schwartzian transform 思想：解析一次，排序时查表。
 */
export function sortByTimestamp(list: List): List {
  const timestampMap = new Map<ListItem['id'], number>()
  for (const item of list) {
    timestampMap.set(item.id, parseInfoTimestamp(item.info))
  }
  return list.slice().sort((a, b) => desc(timestampMap.get(a.id), timestampMap.get(b.id)))
}

/** 按分数排序 */
export function sortByScore(list: List): List {
  return list
    .slice()
    .sort((a, b) => desc(a, b, item => (item.rank ? 10000 - item.rank : item.score)))
}

/** 按评分人数排序 */
export function sortByTotal(list: List): List {
  return list.slice().sort((a, b) => desc(a, b, item => item.total || 0))
}
