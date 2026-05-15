/*
 * @Author: czy0729
 * @Date: 2022-08-14 06:25:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:38:51
 */
import { TIMELINE_TYPE } from '@constants'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'

export const COMPONENT = 'Timeline'

export const REFRESH_EVENT_ID = `${EVENT_APP_TAB_PRESS}|${COMPONENT}` as const

export const TABS = TIMELINE_TYPE.map(item => ({
  title: item.label,
  key: item.value
})).filter(item => !!item.title)
