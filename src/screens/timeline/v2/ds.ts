/*
 * @Author: czy0729
 * @Date: 2022-08-14 06:25:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-27 10:58:38
 */
import { _ } from '@stores'
import { IOS, PAD, TIMELINE_TYPE } from '@constants'

export const COMPONENT = 'Timeline'

export const TABS = TIMELINE_TYPE.map(item => ({
  title: item.label,
  key: item.value
})).filter(item => !!item.title)

export const H_TABBAR = 48 + (IOS && PAD ? _.statusBarHeight : 0)
