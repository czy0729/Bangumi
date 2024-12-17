/*
 * @Author: czy0729
 * @Date: 2021-03-05 15:53:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 20:59:52
 */
import {
  SORT_DJ,
  SORT_DQJ,
  SORT_DQZD,
  SORT_FHL,
  SORT_GDS,
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

export const EXCLUDE_STATE = {
  page: 0,
  level: '',
  sort: '',
  direction: '' as '' | 'up' | 'down',
  _loaded: false as Loaded
}

export const tabs = [
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
  SORT_SC,
  SORT_GDS,
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
