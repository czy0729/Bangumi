/*
 * @Author: czy0729
 * @Date: 2022-07-26 04:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 16:28:29
 */
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'

export const COMPONENT = 'Calendar'

export const LAYOUT_DS = [
  {
    key: 'list',
    title: '列表'
  },
  {
    key: 'grid',
    title: '网格'
  }
] as const

export const TYPE_DS = [
  {
    key: 'all',
    title: '全部'
  },
  {
    key: 'collect',
    title: '收藏'
  }
] as const

/** 早上几点前需要显示前一日的放送 */
export const PREV_DAY_HOUR = 9

export const COVER_WIDTH = Math.floor(IMG_WIDTH * 1.1)

export const COVER_HEIGHT = Math.floor(IMG_HEIGHT * 1.1)
