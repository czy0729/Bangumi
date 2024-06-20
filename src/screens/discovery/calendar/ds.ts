/*
 * @Author: czy0729
 * @Date: 2022-07-26 04:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-20 17:58:13
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
