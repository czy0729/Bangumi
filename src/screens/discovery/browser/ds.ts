/*
 * @Author: czy0729
 * @Date: 2022-07-26 22:57:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:58:54
 */
import { MODEL_SUBJECT_TYPE } from '@constants'
import { BrowserSort, RatingStatus, SubjectType } from '@types'

export const DATE = new Date()

export const NAMESPACE = 'ScreenBrowser'

export const EXCLUDE_STATE = {
  sort: 'date' as BrowserSort,

  /** 是否显示列表, 制造切页效果 */
  show: true,

  /** 收藏管理框 */
  modal: {
    visible: false,
    subjectId: 0,
    title: '',
    desc: '',
    status: '' as '' | RatingStatus,
    action: '听' as '看' | '玩' | '听' | '读'
  }
}

export const STATE = {
  /** 类别 */
  type: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画'),

  /** 年 */
  airtime: DATE.getFullYear(),

  /** 月 */
  month: DATE.getMonth() + 1,

  /** 布局 list | grid */
  layout: 'list',

  /** 是否固定 (工具栏) */
  fixed: false,

  /** 是否显示已收藏 (工具栏) */
  collected: true,

  ...EXCLUDE_STATE,
  _loaded: false
}
