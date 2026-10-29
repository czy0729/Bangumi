/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:48:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 *
 * 页面常量
 */
import type { SearchSort } from '@utils/kv'

export const COMPONENT = 'RakuenSearch'

export const HM = ['rakuenSearch', 'RakuenSearch'] as const

/** 排序选项 */
export const SORT_DS = ['匹配度', '最新回复', '最早发布', '回复数']

/** 排序选项 -> 接口参数 */
export const SORT_KEYS: Record<string, SearchSort> = {
  匹配度: 'match',
  最新回复: 'newest',
  最早发布: 'oldest',
  回复数: 'replies'
}

/** 排序 -> 展示文案 */
export const SORT_LABELS: Record<SearchSort, string> = {
  match: '匹配度',
  newest: '最新回复',
  oldest: '最早发布',
  replies: '回复数'
}
