/*
 * @Author: czy0729
 * @Date: 2024-10-12 19:56:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 04:56:42
 */
import { getTimestamp, getVisualLength, HTMLDecode, lastDate } from '@utils'
import { SUB_TITLE } from '../ds'

import type { UserCollectionsItem } from '@stores/collection/types'
import type { MilestoneItemData, SubTitle } from '../types'

/**
 * 解析路由布尔参数
 *
 * @param value 路由参数原始值
 */
export function parseBool(value: unknown): boolean | undefined {
  if (value === 'true') return true
  if (value === 'false') return false
  return undefined
}

/**
 * 判断是否为合法的第二行 / 第三行显示模式
 *
 * @param value 路由参数原始值
 */
export function isSubTitle(value: string): value is SubTitle {
  return (SUB_TITLE as readonly string[]).includes(value)
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
 *
 * @param tip 描述原文
 * @param subjectType 条目类型
 */
export function parseTip(tip: string, subjectType: string): string {
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
 *
 * @param item 收藏条目
 * @param subjectType 条目类型
 * @param cnFirst 是否标题中文优先
 */
export function precomputeItemData(
  item: UserCollectionsItem,
  subjectType: string,
  cnFirst: boolean
): MilestoneItemData {
  const titleRaw = cnFirst ? item.nameCn || item.name : item.name || item.nameCn
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
  subjectType: string,
  cnFirst: boolean
): MilestoneItemData[] {
  return list.map(item => precomputeItemData(item, subjectType, cnFirst))
}
