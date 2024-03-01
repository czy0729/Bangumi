/*
 * @Author: czy0729
 * @Date: 2021-03-05 10:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 06:01:39
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
import { Loaded } from '@types'
import { Direction } from './types'

export const COMPONENT = 'TinygrailOverview'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 0,
  level: '' as string | number,
  sort: '',
  direction: '' as Direction,
  go: '卖出',
  _loaded: false as Loaded
}

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
  // {
  //   title: '最近活跃',
  //   key: 'recent'
  // },
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
