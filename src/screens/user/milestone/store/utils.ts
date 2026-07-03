/*
 * @Author: czy0729
 * @Date: 2024-10-12 19:56:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-04 21:45:00
 */
import { getTimestamp, getVisualLength, HTMLDecode, lastDate } from '@utils'
import { WEB } from '@constants'

import type { UserCollectionsItem } from '@stores/collection/types'
import type { MilestoneItemData } from '../types'

const KEEP = ['id', 'viewMode', 'userId']

export function cleanQuery() {
  if (typeof window === 'undefined' || !WEB) return

  const url = new window.URL(window.location.href)
  const params = new window.URLSearchParams(url.search)
  const newParams = new window.URLSearchParams()
  for (const [key, value] of params) {
    if (KEEP.includes(key)) newParams.append(key, value)
  }
  url.search = newParams.toString()
  window.history.replaceState({}, '', url.toString())
}

/**
 * 过滤掉无封面的条目
 */
export function filterByCover(list: UserCollectionsItem[], nsfw: boolean): UserCollectionsItem[] {
  if (nsfw) return list
  return list.filter(item => item.cover && !item.cover.includes('no_icon_subject'))
}

/**
 * 按评分过滤条目
 */
export function filterByScore(list: UserCollectionsItem[], score: string): UserCollectionsItem[] {
  if (!score || score === '全部') return list

  return list.filter(item => {
    const itemScore = item.score ? Number(item.score) : 0

    if (score === '未评分') {
      return !item.score || item.score === '0' || item.score === ''
    }

    if (score.includes('-')) {
      const [min, max] = score.split('-').map(Number)
      return itemScore >= min && itemScore <= max
    }

    return itemScore === Number(score)
  })
}

/**
 * 解析描述字段，提取有效部分
 */
function parseTip(tip: string, subjectType: string): string {
  if (!tip || !tip.includes('/')) return ''

  const parts = tip
    .split('/')
    .map(p => p.trim())
    .filter(Boolean)

  if (subjectType === 'game') {
    return parts.slice(-2).join(' / ')
  }

  // 找日期后的部分
  const datePattern = /\d{4}[年\/-]\d{1,2}[月\/-]\d{1,2}/
  const dateIndex = parts.findIndex(part => datePattern.test(part))
  if (dateIndex !== -1 && dateIndex < parts.length - 1) {
    return parts[dateIndex + 1]
  }

  return ''
}

/**
 * 预计算 Item 数据
 * 在 data getter 中调用，避免 Item 渲染时重复计算
 */
export function precomputeItemData(
  item: UserCollectionsItem,
  subjectType: string
): MilestoneItemData {
  const titleRaw = item.nameCn || item.name
  const titleDecoded = HTMLDecode(titleRaw)
  const titleVisualLength = getVisualLength(titleDecoded)

  const ts = getTimestamp(item.time)
  const timeStr = String(item.time).slice(2)
  const parsedTime = lastDate(ts)
  const parsedTimeNoYear = lastDate(ts, false)

  const tipParsed = parseTip(item.tip, subjectType)

  return {
    ...item,
    titleDecoded,
    titleVisualLength,
    timeStr,
    parsedTime,
    parsedTimeNoYear,
    tipParsed
  }
}

/**
 * 批量预计算 Item 数据
 */
export function precomputeItems(
  list: UserCollectionsItem[],
  subjectType: string
): MilestoneItemData[] {
  return list.map(item => precomputeItemData(item, subjectType))
}
