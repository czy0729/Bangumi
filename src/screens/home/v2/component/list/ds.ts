/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:57:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-10 17:17:14
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { IOS, LIST_EMPTY } from '@constants'

import { StoreType as $, TabsLabel } from '../../types'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  style: {
    paddingTop: 0,
    paddingBottom: _.bottom
  },
  forwardRef: (() => {}) as (ref: any) => ReturnType<$['forwardRef']>,
  data: LIST_EMPTY as ReturnType<$['currentCollection']>,
  title: '' as TabsLabel,
  scrollToTop: false as boolean,
  showItem: (IOS ? false : true) as boolean,
  onScroll: (() => {}) as $['onScroll'],
  onHeaderRefresh: (() => {}) as $['onHeaderRefresh'],
  onFooterRefresh: undefined as $['onFooterRefresh'] | undefined
}

export const ENTERING_EXITING_ANIMATIONS_NUM = 4
