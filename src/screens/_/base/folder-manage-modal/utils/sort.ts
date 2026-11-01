/*
 * @Author: czy0729
 * @Date: 2026-11-02 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 目录列表排序
 */
import type { CatalogsItem } from '@stores/users/types'
import type { SortOrder, SortType } from '../types'

/** 目录内的条目总数 (接口只给出各类型的数量) */
export function catalogCount(item: CatalogsItem) {
  return (
    Number(item.anime || 0) +
    Number(item.book || 0) +
    Number(item.music || 0) +
    Number(item.game || 0) +
    Number(item.real || 0)
  )
}

/**
 * 按工具栏规则排序列表
 *
 * @param list 目录列表
 * @param sortType 排序字段
 * @param sortOrder 升 / 降序
 */
export function sortCatalogs(
  list: CatalogsItem[],
  sortType: SortType,
  sortOrder: SortOrder
): CatalogsItem[] {
  const next = list.slice()

  if (sortType === 'date') {
    return next.sort((a, b) => {
      const dateA = Date.parse(a.time.replace('创建于:', ''))
      const dateB = Date.parse(b.time.replace('创建于:', ''))
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })
  }

  if (sortType === 'name') {
    return next.sort((a, b) => {
      return sortOrder === 'desc'
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title)
    })
  }

  if (sortType === 'count') {
    return next.sort((a, b) => {
      const countA = catalogCount(a)
      const countB = catalogCount(b)
      return sortOrder === 'desc' ? countB - countA : countA - countB
    })
  }

  return next
}
