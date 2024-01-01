/*
 * @Author: czy0729
 * @Date: 2022-08-05 05:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-31 15:01:20
 */
import { rc } from '@utils/dev'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Filter')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showFilter: false as $['state']['showFilter'],
  fliterInputText: '' as $['state']['fliterInputText'],
  isTabActive: false as ReturnType<$['isTabActive']>,
  isFiltering: false as ReturnType<$['isFiltering']>,
  onFilterChange: (() => {}) as $['onFilterChange']
}
