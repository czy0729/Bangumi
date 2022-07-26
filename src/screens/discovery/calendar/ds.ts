/*
 * @Author: czy0729
 * @Date: 2022-07-26 04:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-26 04:57:04
 */
import { Actions, RatingStatus } from '@types'

export const NAMESPACE = 'ScreenCalendar'

export const EXCLUDE_STATE = {
  /** 收藏管理框 */
  modal: {
    visible: false,
    subjectId: 0,
    title: '',
    desc: '',
    status: '' as '' | RatingStatus,
    action: '听' as Actions
  }
}

export const STATE = {
  /** 布局 list | grid */
  layout: 'list',

  /** 筛选 all | collect */
  type: 'all',

  /** 是否展开所有 */
  expand: false,

  /** 收藏管理框 */
  modal: {
    visible: false,
    subjectId: 0,
    title: '',
    desc: '',
    status: '' as '' | RatingStatus,
    action: '听' as Actions
  },

  ...EXCLUDE_STATE,
  _lastQueue: 0,
  _loaded: false
}
