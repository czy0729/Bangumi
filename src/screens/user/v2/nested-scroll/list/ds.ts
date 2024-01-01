/*
 * @Author: czy0729
 * @Date: 2023-12-30 08:20:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 19:36:40
 */
import { rc } from '@utils/dev'
import { FN, LIST_EMPTY } from '@constants'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'List')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  list: true,
  page: 0,
  data: LIST_EMPTY as ReturnType<$['userCollections']>,
  numColumns: undefined as $['numColumns'],
  userPagination: false as boolean,
  onScroll: FN,
  onHeaderRefresh: FN,
  onFooterRefresh: FN
}
