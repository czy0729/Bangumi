/*
 * @Author: czy0729
 * @Date: 2026-06-29 07:08:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-29 07:08:58
 */
import { useMemo } from 'react'

import type { ListEmpty, MaybeReadonly, Sections } from '@types'

/**
 * 列表数据计算 hook
 * 只接收具体字段，不依赖整个 props 引用
 */
export function useListData<ItemT extends Record<string, any>>({
  data,
  sectionKey,
  sections: rawSections
}: {
  data: MaybeReadonly<ListEmpty<ItemT>>
  sectionKey?: string
  sections?: Sections<any>
}) {
  /** 计算分组数据（SectionList 模式） */
  const sections = useMemo(() => {
    if (rawSections) return rawSections.slice()
    if (!sectionKey || !data?.list) return []

    const computedSections: { title: string; data: ItemT[] }[] = []
    // 显式声明索引字典，避免隐式 any 报错
    const sectionsMap: Record<string, number> = {}

    data.list.forEach(item => {
      // 通过类型约束 ItemT extends Record<string, any> 确保索引操作安全
      const title = String(item[sectionKey] ?? '')

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
  }, [data?.list, sectionKey, rawSections])

  const list = data?.list || []

  return {
    sections,
    list
  }
}
