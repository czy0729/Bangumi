/*
 * @Author: czy0729
 * @Date: 2022-08-14 06:25:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 07:43:58
 */
import { MODEL_TIMELINE_SCOPE, TIMELINE_TYPE } from '@constants'
import { TimeLineScope } from '@types'

export const NAMESPACE = 'ScreenTimeline'

export const TABS = TIMELINE_TYPE.map(item => ({
  title: item.label
}))

export const H_TABBAR = 48

export const EXCLUDE_STATE = {
  /** 页面是否聚焦 */
  isFocused: true
}

export const STATE = {
  /** 范围 */
  scope: MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('全站'),

  /** Tabs 当前页数 */
  page: 0,

  /** 已经渲染的 Tab index */
  renderedTabsIndex: [],
  ...EXCLUDE_STATE,
  _loaded: false
}
