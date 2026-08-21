/*
 * @Author: czy0729
 * @Date: 2026-06-29 07:08:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 15:00:00
 */
import { useMemo } from 'react'

import type { UseListDataOptions } from './types'

/**
 * 列表数据计算 hook
 * 只接收具体字段，不依赖整个 props 引用
 */
export function useListData<ItemT>(options: UseListDataOptions<ItemT>) {
  const { data, sectionKey, sections: rawSections } = options

  /** 归一化为普通数组，规避 MaybeReadonly 的只读深层类型 */
  const list = useMemo(() => (data?.list || []) as ItemT[], [data?.list])

  /** 计算分组数据（SectionList 模式） */
  const sections = useMemo(() => {
    if (rawSections) return rawSections.slice()
    if (!sectionKey || !list.length) return []

    const computedSections: { title: string; data: ItemT[] }[] = []
    const sectionsMap: Record<string, number> = {}

    list.forEach(item => {
      // 通过断言获取分组键，避免对 ItemT 施加索引签名约束
      const title = String((item as Record<string, unknown>)[sectionKey] ?? '')

      if (sectionsMap[title] === undefined) {
        sectionsMap[title] = computedSections.length
        computedSections.push({
          title,
          data: [item]
        })
      } else {
        computedSections[sectionsMap[title]].data.push(item)
      }
    })

    return computedSections
  }, [list, sectionKey, rawSections])

  return {
    sections,
    list
  }
}
