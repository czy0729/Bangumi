/*
 * @Author: czy0729
 * @Date: 2023-12-30 08:20:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 13:07:22
 */
import { rc } from '@utils/dev'
import { FROZEN_FN, LIST_EMPTY } from '@constants'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

export const COMPONENT = rc(PARENT, 'List')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  list: true,
  page: 0,
  data: LIST_EMPTY as ReturnType<$['userCollections']>,
  numColumns: undefined as $['numColumns'],
  userPagination: false as boolean,
  onScroll: FROZEN_FN,
  onHeaderRefresh: FROZEN_FN,
  onFooterRefresh: FROZEN_FN
}
