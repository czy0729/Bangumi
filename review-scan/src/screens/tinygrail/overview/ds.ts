/*
 * @Author: czy0729
 * @Date: 2021-03-05 10:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-10 18:19:59
 */
import {
  SORT_DJ,
  SORT_DQJ,
  SORT_FHL,
  SORT_GX,
  SORT_MWCS,
  SORT_PM,
  SORT_SSGX,
  SORT_SSSJ,
  SORT_XJB,
  SORT_XX,
  SORT_XZL
} from '@tinygrail/_/utils'

export const COMPONENT = 'TinygrailOverview'

export const HM = ['tinygrail/overview', 'TinygrailOverview'] as const

export const SORT_DS = [
  SORT_DJ,
  SORT_XX,
  SORT_XZL,
  SORT_PM,
  SORT_DQJ,
  SORT_XJB,
  SORT_GX,
  SORT_SSGX,
  SORT_FHL,
  SORT_MWCS,
  SORT_SSSJ
] as const

export const TABS = [
  {
    title: '精炼排行',
    key: 'refine/temple'
  },
  {
    title: '最高股息',
    key: 'msrc'
  },
  {
    title: '最高市值',
    key: 'mvc'
  },
  {
    title: '最大涨幅',
    key: 'mrc'
  },
  {
    title: '最大跌幅',
    key: 'mfc'
  }
] as const
