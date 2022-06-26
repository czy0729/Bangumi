/*
 * @Author: czy0729
 * @Date: 2022-06-13 09:21:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-26 14:58:23
 */
import { FilterSwitchName } from '../filter-switch/types'

type FilterItem = {
  title: string
  type: string
  data: any[]
  login?: boolean
  always?: boolean
}

export type Props = {
  filterDS: FilterItem[]
  title?: string
  name?: FilterSwitchName
  type?: string
  lastUpdate?: string
}
