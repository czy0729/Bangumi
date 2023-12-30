/*
 * @Author: czy0729
 * @Date: 2023-12-30 08:20:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 08:31:41
 */
import { FN, LIST_EMPTY } from '@constants'
import { StoreType as $ } from '../../types'

export const DEFAULT_PROPS = {
  page: 0,
  data: LIST_EMPTY as ReturnType<$['userCollections']>,
  numColumns: undefined as $['numColumns'],
  onScroll: FN,
  onHeaderRefresh: FN,
  onFooterRefresh: FN
}
