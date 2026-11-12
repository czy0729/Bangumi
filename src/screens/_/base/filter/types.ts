/*
 * @Author: czy0729
 * @Date: 2024-07-20 12:14:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 22:21:17
 *
 * 筛选面板类型定义
 */
import type { DeepPartial, ReactNode } from '@types'
import type { FilterSwitchName } from '../filter-switch/types'

/** 筛选项 (筛选组件与查询清洗共用) */
export type FilterItem = {
  title: string
  type: string
  data: unknown[] | readonly unknown[]
  login?: boolean
  multiple?: boolean
  multiSelect?: boolean
  nums?: Record<string, number>
  always?: boolean
}

export type Props = {
  filterDS: FilterItem[] | readonly FilterItem[]
  title?: string
  name?: FilterSwitchName
  type?: string
  lastUpdate?: string
  information?: string
  renderRight?: ReactNode
}

/** 条件计数结果: 维度 key → 候选文案 → 数量 */
export type Counts = Record<string, Record<string, number>>

export type Ctx = DeepPartial<{
  $: {
    state: {
      query: Record<string, unknown>
      layout: string
      expand: boolean
      _loaded: boolean
    }
    /** 条件分面计数 (数据未就绪返回 null) */
    counts: (query: Record<string, unknown>) => Counts | null
    list: unknown[]
    total: number
    isLogin: boolean
    /**
     * 选择 / 移除条件
     *  - 多选维 (tags/meta 等数组形态) 约定: multiple=true 时 value 传 '' 表示清空该维 (归一为 [])
     *  - 单值维 value 传 '' 表示回到「全部」
     */
    onSelect: (type: string, value?: string | number, multiple?: boolean) => void
    onExpand: () => void
    /** 批量重置等场景直接替换 query 后手动驱动查询与持久化 */
    setState: (state: { query: Record<string, unknown> }) => void
    search: () => void
    save: () => unknown
  }
}>
