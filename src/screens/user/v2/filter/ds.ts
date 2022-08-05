/*
 * @Author: czy0729
 * @Date: 2022-08-05 05:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-05 06:21:54
 */
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showFilter: false as $['state']['showFilter'],
  fliterInputText: '' as $['state']['fliterInputText'],
  isTabActive: false as ReturnType<$['isTabActive']>,
  isFiltering: false as ReturnType<$['isFiltering']>,
  onFilterChange: (() => {}) as $['onFilterChange']
}
