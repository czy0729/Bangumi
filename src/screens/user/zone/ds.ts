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
    key: 'bangumi'
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
]
export const STATS_TYPES = [
  {
    title: '全部',
    value: 'all'
  },
  {
    title: '书籍',
    value: '1'
  },
  {
    title: '动画',
    value: '2'
  },
  {
    title: '音乐',
    value: '3'
  },
  {
    title: '游戏',
    value: '4'
  }
] as const

export const TABS_WITH_TINYGRAIL = [
  ...TABS,
  {
    title: '小圣杯',
    key: 'tinygrail'
  }
] as const
