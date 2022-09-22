/*
 * @Author: czy0729
 * @Date: 2022-06-13 09:21:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 16:44:28
 */
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
}
