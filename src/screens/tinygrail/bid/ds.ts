/*
 * @Author: czy0729
 * @Date: 2021-03-05 15:53:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-16 16:26:10
 */
import {
  SORT_DJ,
  SORT_DQJ,
  SORT_DQZD,
  SORT_FHL,
  SORT_GDS,
  SORT_HYD,
  SORT_PM,
  SORT_SCJ,
  SORT_SSGX,
  SORT_SSSJ,
  SORT_XJB,
  SORT_XX
} from '@tinygrail/_/utils'

export const COMPONENT = 'TinygrailBid'

export const TABS = [
  {
    title: '我的买单',
    key: 'bid'
  },
  {
    title: '我的卖单',
    key: 'asks'
  },
  {
    title: '我的拍卖',
    key: 'auction'
  }
] as const

export const SORT_DS = [
  SORT_GDS,
  SORT_DJ,
  SORT_XX,
  SORT_PM,
  SORT_DQJ,
  SORT_SSGX,
  SORT_XJB,
  SORT_HYD,
  SORT_SCJ,
  SORT_DQZD,
  SORT_FHL,
  SORT_SSSJ
] as const
