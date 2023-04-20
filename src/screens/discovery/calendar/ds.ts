/*
 * @Author: czy0729
 * @Date: 2022-07-26 04:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 14:10:54
 */
import { _ } from '@stores'

export const NAMESPACE = 'ScreenCalendar'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  /** 布局 list | grid */
  layout: 'list',

  /** 筛选 all | collect */
  type: 'all',

  /** 是否展开所有 */
  expand: false,

  ...EXCLUDE_STATE,
  _lastQueue: 0,
  _loaded: false
}
