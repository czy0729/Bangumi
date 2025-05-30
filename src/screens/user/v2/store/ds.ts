/*
 * @Author: czy0729
 * @Date: 2022-08-04 17:12:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 08:43:32
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT, DEFAULT_ORDER, DEFAULT_SUBJECT_TYPE } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,
  isFocused: true,
  showFilter: false,
  fixed: false,
  filter: '',
  fliterInputText: '',
  fetching: false,
  loadedPage: [] as number[]
}

export const STATE = {
  ...EXCLUDE_STATE,
  subjectType: DEFAULT_SUBJECT_TYPE,
  order: DEFAULT_ORDER,
  list: true,
  showYear: true,
  tag: '',

  /** Tabs 当前页数 */
  page: 2,

  /** 各类型当前 Input 页数 */
  ipt: '1',

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
