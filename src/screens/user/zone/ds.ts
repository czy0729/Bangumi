/*
 * @Author: czy0729
 * @Date: 2024-04-08 18:38:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 16:44:31
 */
import { MODEL_SUBJECT_TYPE } from '@constants'

import type { SubjectType } from '@types'

export { H_HEADER, H_RADIUS_LINE, H_TABBAR } from '@screens/user/v2/ds'

export const COMPONENT = 'Zone'

export const TABS = [
  {
    title: '关于',
    key: 'about'
  },
  {
    title: '收藏',
    key: 'collection'
  },
  {
    title: '统计',
    key: 'stats'
  },
  {
    title: '时间线',
    key: 'timeline'
  },
  {
    title: '超展开',
    key: 'rakuen'
  }
] as const

export const COLLECTION_TYPES = [
  {
    title: '动画',
    value: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画')
  },
  {
    title: '书籍',
    value: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('书籍')
  },
  {
    title: '音乐',
    value: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('音乐')
  },
  {
    title: '游戏',
    value: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('游戏')
  },
  {
    title: '三次元',
    value: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('三次元')
  }
] as const

export type CollectionTypeTitle = (typeof COLLECTION_TYPES)[number]['title']

export const TABS_WITH_TINYGRAIL = [
  ...TABS,
  {
    title: '小圣杯',
    key: 'tinygrail'
  }
] as const

export type ZoneTabKey = (typeof TABS_WITH_TINYGRAIL)[number]['key']

export const TAB_PAGE = TABS_WITH_TINYGRAIL.reduce((result, item, index) => {
  result[item.key] = index
  return result
}, {} as Record<ZoneTabKey, number>)
