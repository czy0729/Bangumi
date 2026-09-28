/*
 * @Author: czy0729
 * @Date: 2026-09-28 20:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 20:00:00
 *
 * 筛选选项构建与选项文案解析
 */
import { TEXT_MENU_SPLIT_LEFT, withSplit } from '@constants/text'
import { TEXT_ALL } from './ds'

import type { ListItem } from '../../types'

/** 由条目列表生成 [全部〔数量〕, 类型〔数量〕, ...] 筛选选项, 无 desc 的条目不参与归并 */
export function buildFilterData(list: ListItem[]) {
  const data: string[] = []
  if (!list.length) return data

  const counts = new Map<string, number>()
  list.forEach(item => {
    if (!item.desc) return

    counts.set(item.desc, (counts.get(item.desc) || 0) + 1)
  })

  data.push(`${TEXT_ALL}${withSplit(list.length)}`)
  counts.forEach((count, desc) => {
    data.push(`${desc}${withSplit(count)}`)
  })
  return data
}

/** 从选项文案解析出筛选值 (全部 → 空串, 表示不过滤) */
export function parseFilterValue(text: string) {
  const [desc] = text.split(TEXT_MENU_SPLIT_LEFT)
  if (desc === TEXT_ALL) return ''

  return desc || ''
}
