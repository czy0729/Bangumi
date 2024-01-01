/*
 * @Author: czy0729
 * @Date: 2023-12-30 08:20:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-31 13:16:38
 */
import { rc } from '@utils/dev'
import { FN, LIST_EMPTY } from '@constants'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  page: 0,
  data: LIST_EMPTY as ReturnType<$['userCollections']>,
  numColumns: undefined as $['numColumns'],
  onScroll: FN,
  onHeaderRefresh: FN,
  onFooterRefresh: FN
}
