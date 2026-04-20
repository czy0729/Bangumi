/*
 * @Author: czy0729
 * @Date: 2024-07-20 12:14:05
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-20 12:14:05
 */
import { AnyObject, DeepPartial, Fn, ReactNode } from '@types'
import { FilterSwitchName } from '../filter-switch/types'

type FilterItem = {
  title: string
  type: string
  data: any[] | readonly any[]
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
      query: AnyObject
      layout: string
      expand: boolean
    }
    list: any[]
    total: number
    isLogin: boolean
    onSelect: Fn
    onExpand: Fn
  }
}>
