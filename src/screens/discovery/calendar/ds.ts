/*
 * @Author: czy0729
 * @Date: 2022-07-26 04:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 16:19:14
 */
export const NAMESPACE = 'ScreenCalendar'

export const STATE = {
  /** 布局 list | grid */
  layout: 'list',

  /** 筛选 all | collect */
  type: 'all',

  /** 是否展开所有 */
  expand: false,

  _lastQueue: 0,
  _loaded: false
}
