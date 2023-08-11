/*
 * @Author: czy0729
 * @Date: 2021-11-30 03:41:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-11 17:10:42
 */
import {
  DEV,
  LIST_EMPTY,
  TEXT_EMPTY,
  TEXT_FAIL,
  TEXT_NO_MORE,
  TEXT_REFRESHING
} from '@constants'

export const REFRESH_STATE = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5
} as const

export const DEFAULT_PROPS = {
  style: undefined,
  keyExtractor: undefined,
  data: LIST_EMPTY,
  sections: undefined,
  sectionKey: '',
  progressViewOffset: undefined,
  refreshControlProps: {},
  renderItem: undefined,
  footerRefreshingText: TEXT_REFRESHING,
  footerFailureText: TEXT_FAIL,
  footerNoMoreDataText: TEXT_NO_MORE,
  footerNoMoreDataComponent: undefined,
  footerEmptyDataText: TEXT_EMPTY,
  footerEmptyDataComponent: undefined,
  footerTextType: 'sub',
  showFooter: true,
  showMesume: true,
  optimize: true,
  scrollToTop: false,

  /** @deprecated */
  lazy: 0,
  scrollIndicatorInsets: {
    right: 1
  },
  onHeaderRefresh: undefined,
  onFooterRefresh: undefined
} as const

export const SCROLL_CALLBACK = () => {
  if (DEV) console.info('LIST_VIEW: no scroll event bind')
}
