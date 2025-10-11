/*
 * @Author: czy0729
 * @Date: 2022-07-26 22:57:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-25 21:56:30
 */
import { _ } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { BrowserSort, Loaded, SubjectType } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}`

export const DATE = new Date()

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 排序 */
  sort: 'date' as BrowserSort,

  /** 是否显示列表, 制造切页效果 */
  show: true,

  /** 云快照 */
  ota: {}
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 类别 */
  type: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画'),

  /** 年 */
  airtime: DATE.getFullYear(),

  /** 月 */
  month: (DATE.getMonth() + 1) as number | '不选择',

  /** 布局 list | grid */
  layout: 'list',

  /** 是否固定 (工具栏) */
  fixed: false,

  /** 是否显示已收藏 (工具栏) */
  collected: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
