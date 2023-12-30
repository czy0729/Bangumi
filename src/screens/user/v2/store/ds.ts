/*
 * @Author: czy0729
 * @Date: 2022-08-04 17:12:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 08:43:32
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { DEFAULT_SUBJECT_TYPE, DEFAULT_ORDER } from '../ds'

export const NAMESPACE = 'ScreenUser'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,
  isFocused: true,
  showFilter: false,
  fixed: false,
  filter: '',
  fliterInputText: '',
  fetching: false,
  loadedPage: [] as number[]
}

export const STATE = {
  subjectType: DEFAULT_SUBJECT_TYPE,
  order: DEFAULT_ORDER,
  list: true,
  showYear: true,
  tag: '',

  /** Tabs 当前页数 */
  page: 2,

  /** 各类型当前 Input 页数 */
  ipt: '1',
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
