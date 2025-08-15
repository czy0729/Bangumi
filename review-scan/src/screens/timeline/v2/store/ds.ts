/*
 * @Author: czy0729
 * @Date: 2022-08-14 06:25:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-27 10:58:52
 */
import { _ } from '@stores'
import { MODEL_TIMELINE_SCOPE } from '@constants'
import { Loaded, TimeLineScope } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 范围 */
  scope: MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('全站'),

  /** Tabs 当前页数 */
  page: 0,

  /** 已经渲染的 Tab index */
  renderedTabsIndex: [],

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
