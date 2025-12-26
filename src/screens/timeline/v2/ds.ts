/*
 * @Author: czy0729
 * @Date: 2022-08-14 06:25:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:38:51
 */
import { IOS, PAD, TIMELINE_TYPE } from '@constants'
import { STATUS_BAR_HEIGHT } from '@styles'

export const COMPONENT = 'Timeline'

export const TABS = TIMELINE_TYPE.map(item => ({
  title: item.label,
  key: item.value
})).filter(item => !!item.title)

export const H_TABBAR = 48 + (IOS && PAD ? STATUS_BAR_HEIGHT : 0)
