/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:57:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 17:58:10
 */
import { rc } from '@utils/dev'
import { IOS, LIST_EMPTY } from '@constants'
import { StoreType as $, TabLabel } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'List')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  forwardRef: (() => {}) as (ref: any) => ReturnType<$['forwardRef']>,
  data: LIST_EMPTY as ReturnType<$['currentCollection']>,
  title: '' as TabLabel,
  scrollToTop: false as boolean,
  showItem: (IOS ? false : true) as boolean,
  onScroll: (() => {}) as $['onScroll'],
  onHeaderRefresh: (() => {}) as $['onHeaderRefresh'],
  onFooterRefresh: undefined as $['onFooterRefresh'] | undefined
}

export const ENTERING_EXITING_ANIMATIONS_NUM = 4
