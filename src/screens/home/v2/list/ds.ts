/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:57:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-11 18:27:25
 */
import { LIST_EMPTY } from '@constants'
import { StoreType } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  connectRef: (() => {}) as (ref: any) => ReturnType<StoreType['connectRef']>,
  data: LIST_EMPTY as ReturnType<StoreType['currentUserCollection']>,
  title: '',
  scrollToTop: false,
  onHeaderRefresh: (() => {}) as StoreType['onHeaderRefresh'],
  onFooterRefresh: undefined as StoreType['onFooterRefresh']
}
