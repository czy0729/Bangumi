/*
 * @Author: czy0729
 * @Date: 2021-03-05 10:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 21:00:50
 */
import {
  SORT_DJ,
  SORT_DQJ,
  SORT_DQZD,
  SORT_FHL,
  SORT_GX,
  SORT_HYD,
  SORT_RK,
  SORT_SC,
  SORT_SCJ,
  SORT_SSGX,
  SORT_XFJL,
  SORT_XX
} from '@tinygrail/_/utils'

export const COMPONENT = 'TinygrailOverview'

export const SORT_DS = [
  SORT_SC,
  SORT_GX,
  SORT_SSGX,
  SORT_RK,
  SORT_XX,
  SORT_HYD,
  SORT_DQJ,
  SORT_SCJ,
  SORT_DQZD,
  SORT_DJ,
  SORT_XFJL,
  SORT_FHL
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
