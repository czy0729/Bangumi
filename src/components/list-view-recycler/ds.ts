/*
 * @Author: czy0729
 * @Date: 2022-07-09 01:06:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-09 12:01:12
 */
import { _ } from '@stores'

export const VIEW_TYPES = {
  HEADER: 'header',
  ROW: 'row',
  FOOTER: 'footer'
} as const

export const DIMENSION = {
  width: _.window.width,
  height: _.window.height
} as const

export const SCROLL_VIEW_PROPS = {
  showsVerticalScrollIndicator: false,
  overScrollMode: 'never'
} as const

export const REFRESH_STATE = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5
} as const
