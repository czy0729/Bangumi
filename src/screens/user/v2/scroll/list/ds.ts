/*
 * @Author: czy0729
 * @Date: 2023-03-21 17:39:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:51:59
 */
import { rc } from '@utils/dev'
import { FROZEN_FN, LIST_EMPTY } from '@constants'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'List')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  forwardRef: FROZEN_FN as $['forwardRef'],
  scrollY: 0 as any,
  page: 0 as number,
  list: true as boolean,
  userPagination: false as boolean,
  userGridNum: 4 as number,
  userCollections: LIST_EMPTY as ReturnType<$['userCollections']>,
  onScroll: FROZEN_FN,
  onRefreshOffset: FROZEN_FN,
  onHeaderRefresh: FROZEN_FN,
  onFooterRefresh: FROZEN_FN
}
