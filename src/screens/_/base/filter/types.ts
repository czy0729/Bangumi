/*
 * @Author: czy0729
 * @Date: 2022-06-13 09:21:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 15:37:02
 */
import { FilterSwitchName } from '../filter-switch/types'

type FilterItem = {
  title: string
  type: string
  data: any[] | readonly any[]
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
