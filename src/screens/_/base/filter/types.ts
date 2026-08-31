/*
 * @Author: czy0729
 * @Date: 2024-07-20 12:14:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 04:09:38
 */
import type { DeepPartial, ReactNode } from '@types'
import type { FilterSwitchName } from '../filter-switch/types'

type FilterItem = {
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

export type Ctx = DeepPartial<{
  $: {
    state: {
      query: Record<string, unknown>
      layout: string
      expand: boolean
    }
    list: unknown[]
    total: number
    isLogin: boolean
    onSelect: (type: string, value?: string | number, multiple?: boolean) => void
    onExpand: () => void
  }
}>
