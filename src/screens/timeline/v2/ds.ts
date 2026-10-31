/*
 * @Author: czy0729
 * @Date: 2022-08-14 06:25:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * 时间胶囊页面常量
 */
import { TIMELINE_TYPE } from '@constants'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'

export const COMPONENT = 'Timeline'

/** TabBar 高度 (未缩放, 仅用于布局计算) */
export const H_TABBAR = 48

export const REFRESH_EVENT_ID = `${EVENT_APP_TAB_PRESS}|${COMPONENT}` as const

export const TABS = TIMELINE_TYPE.map(item => ({
  title: item.label,
  key: item.value
})).filter(item => !!item.title)
