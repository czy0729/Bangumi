/*
 * @Author: czy0729
 * @Date: 2025-03-19 06:27:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 15:04:16
 */
import { HandleSortType, SortOrder, SortType } from '../types'

export type Props = {
  sortType: SortType
  sortOrder: SortOrder
  onSortType: HandleSortType
}
