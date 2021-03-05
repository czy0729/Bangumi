/*
 * @Author: czy0729
 * @Date: 2021-03-05 10:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-05 11:01:20
 */
import {
  SORT_RK,
  SORT_XX,
  SORT_SC,
  SORT_GX,
  SORT_SSGX,
  // SORT_GXB,
  // SORT_SDGX,
  // SORT_SDGXB,
  SORT_DJ,
  SORT_HYD,
  SORT_SCJ,
  SORT_FHL,
  SORT_DQJ,
  SORT_DQZD,
  SORT_XFJL
} from '@tinygrail/_/utils'

export const namespace = 'ScreenTinygrailOverview'

export const sortDS = [
  SORT_SC,
  SORT_GX,
  SORT_SSGX,
  SORT_RK,
  SORT_XX,
  // SORT_SDGX,
  SORT_HYD,
  SORT_DQJ,
  SORT_SCJ,
  SORT_DQZD,
  SORT_DJ,
  SORT_XFJL,
  SORT_FHL
  // SORT_GXB,
  // SORT_SDGXB
]

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
]
