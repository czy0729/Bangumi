/*
 * @Author: czy0729
 * @Date: 2022-07-26 04:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 10:58:02
 */
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
