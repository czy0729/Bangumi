/*
 * @Author: czy0729
 * @Date: 2022-08-05 05:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:52:26
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

export const COMPONENT = rc(PARENT, 'Filter')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showFilter: false as $['state']['showFilter'],
  fliterInputText: '' as $['state']['fliterInputText'],
  isTabActive: false as ReturnType<$['isTabActive']>,
  isFiltering: false as ReturnType<$['isFiltering']>,
  onFilterChange: FROZEN_FN as $['onFilterChange']
}
