/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-29 19:47:46
 */
export const COMPONENT = 'CatalogDetail'

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

export const SORT_DS = [
  {
    key: '0',
    title: '默认'
  },
  {
    key: '1',
    title: '时间'
  },
  {
    key: '2',
    title: '评分'
  }
] as const
