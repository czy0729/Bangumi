/*
 * @Author: czy0729
 * @Date: 2023-03-21 17:39:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-11 21:13:31
 */
import { LIST_EMPTY } from '@constants'
import { Fn } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  forwardRef: (() => {}) as $['forwardRef'],
  scrollY: 0 as any,
  page: 0 as number,
  list: true as boolean,
  userPagination: false as boolean,
  userGridNum: 4 as number,
  userCollections: LIST_EMPTY as ReturnType<$['userCollections']>,
  onScroll: (() => {}) as Fn,
  onRefreshOffset: (() => {}) as Fn,
  onHeaderRefresh: (() => {}) as Fn,
  onFooterRefresh: (() => {}) as Fn
}
