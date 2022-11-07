/*
 * @Author: czy0729
 * @Date: 2021-03-05 10:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 15:07:55
 */
import {
  SORT_RK,
  SORT_XX,
  SORT_SC,
  SORT_GX,
  SORT_SSGX,
  SORT_DJ,
  SORT_HYD,
  SORT_SCJ,
  SORT_FHL,
  SORT_DQJ,
  SORT_DQZD,
  SORT_XFJL
} from '@tinygrail/_/utils'

export const NAMESPACE = 'ScreenTinygrailOverview'

/** @deprecated */
export const sortDS = [
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

export const SORT_DS = sortDS

/** @deprecated */
export const tabs = [
  {
    title: '最近活跃',
    key: 'recent'
  },
  {
    title: '最高市值',
    key: 'mvc'
  },
  {
    title: '最高股息',
    key: 'msrc'
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

export const TABS = tabs
